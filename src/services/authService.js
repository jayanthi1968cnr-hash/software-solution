import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from "firebase/firestore";
import { auth, db } from "./firebase";

// ==================== USER REGISTRATION ====================
export const registerUser = async (email, password, displayName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: displayName
    });

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      displayName: displayName,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isActive: true,
      role: "user" // Default role
    });

    // Log registration activity
    await logActivity(user.uid, "REGISTRATION", {
      email: email,
      displayName: displayName
    });

    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== USER LOGIN ====================
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login time
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp()
    });

    // Log login activity
    await logActivity(user.uid, "LOGIN", {
      email: email,
      loginMethod: "email/password"
    });

    return { success: true, user };
  } catch (error) {
    console.error("Login error:", error);
    
    // Log failed login attempt
    await logActivity(null, "LOGIN_FAILED", {
      email: email,
      error: error.code
    });

    return { success: false, error: error.message };
  }
};

// ==================== USER LOGOUT ====================
export const logoutUser = async () => {
  try {
    const user = auth.currentUser;
    
    if (user) {
      // Log logout activity before signing out
      await logActivity(user.uid, "LOGOUT", {
        email: user.email
      });
    }

    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== PASSWORD RESET ====================
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    
    // Log password reset request
    await logActivity(null, "PASSWORD_RESET_REQUEST", {
      email: email
    });

    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== GET USER PROFILE ====================
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Get user profile error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== UPDATE USER PROFILE ====================
export const updateUserProfile = async (uid, updates) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });

    // Log profile update activity
    await logActivity(uid, "PROFILE_UPDATE", {
      updatedFields: Object.keys(updates)
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG USER ACTIVITY ====================
export const logActivity = async (uid, activityType, details = {}) => {
  try {
    await addDoc(collection(db, "activities"), {
      uid: uid || "anonymous",
      activityType: activityType,
      details: details,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      ipAddress: "N/A" // You can integrate an IP detection service if needed
    });
    
    return { success: true };
  } catch (error) {
    console.error("Log activity error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== GET USER ACTIVITIES ====================
export const getUserActivities = async (uid, activityLimit = 50) => {
  try {
    const q = query(
      collection(db, "activities"),
      where("uid", "==", uid),
      orderBy("timestamp", "desc"),
      limit(activityLimit)
    );

    const querySnapshot = await getDocs(q);
    const activities = [];
    
    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, data: activities };
  } catch (error) {
    console.error("Get activities error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== GET ALL ACTIVITIES (ADMIN) ====================
export const getAllActivities = async (activityLimit = 100) => {
  try {
    const q = query(
      collection(db, "activities"),
      orderBy("timestamp", "desc"),
      limit(activityLimit)
    );

    const querySnapshot = await getDocs(q);
    const activities = [];
    
    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, data: activities };
  } catch (error) {
    console.error("Get all activities error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG CUSTOM ACTIVITY ====================
// Use this for any other activities like page views, button clicks, etc.
export const logCustomActivity = async (activityType, details = {}) => {
  try {
    const user = auth.currentUser;
    
    await logActivity(
      user ? user.uid : null,
      activityType,
      {
        ...details,
        authenticated: !!user
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Log custom activity error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== AUTH STATE LISTENER ====================
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ==================== GET CURRENT USER ====================
export const getCurrentUser = () => {
  return auth.currentUser;
};

// ==================== CHECK IF USER IS AUTHENTICATED ====================
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// ==================== LOG PAGE VIEW ====================
export const logPageView = async (pageName, pageUrl) => {
  try {
    await logCustomActivity("PAGE_VIEW", {
      page: pageName,
      url: pageUrl,
      referrer: document.referrer || "direct"
    });
    return { success: true };
  } catch (error) {
    console.error("Log page view error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG BUTTON CLICK ====================
export const logButtonClick = async (buttonName, buttonLocation) => {
  try {
    await logCustomActivity("BUTTON_CLICK", {
      button: buttonName,
      location: buttonLocation
    });
    return { success: true };
  } catch (error) {
    console.error("Log button click error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG FORM SUBMISSION ====================
export const logFormSubmission = async (formName, formData = {}) => {
  try {
    await logCustomActivity("FORM_SUBMISSION", {
      form: formName,
      fields: Object.keys(formData)
    });
    return { success: true };
  } catch (error) {
    console.error("Log form submission error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG DOWNLOAD ====================
export const logDownload = async (fileName, fileType) => {
  try {
    await logCustomActivity("DOWNLOAD", {
      file: fileName,
      type: fileType
    });
    return { success: true };
  } catch (error) {
    console.error("Log download error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== LOG ERROR ====================
export const logError = async (errorMessage, errorLocation) => {
  try {
    await logCustomActivity("ERROR", {
      message: errorMessage,
      location: errorLocation
    });
    return { success: true };
  } catch (error) {
    console.error("Log error error:", error);
    return { success: false, error: error.message };
  }
};

// ==================== EXPORT ALL FUNCTIONS ====================
export default {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  logActivity,
  getUserActivities,
  getAllActivities,
  logCustomActivity,
  onAuthStateChange,
  getCurrentUser,
  isAuthenticated,
  logPageView,
  logButtonClick,
  logFormSubmission,
  logDownload,
  logError
};