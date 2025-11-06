import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { getUserProfile, getUserActivities, logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user profile
        const profileResult = await getUserProfile(user.uid);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        }

        // Fetch user activities
        const activitiesResult = await getUserActivities(user.uid);
        if (activitiesResult.success) {
          setActivities(activitiesResult.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    
    // Handle Firestore timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const getActivityIcon = (activityType) => {
    const icons = {
      REGISTRATION: "👤",
      LOGIN: "🔐",
      LOGOUT: "🚪",
      LOGIN_FAILED: "❌",
      PASSWORD_RESET_REQUEST: "🔑",
      PROFILE_UPDATE: "✏️",
      PAGE_VIEW: "👁️",
      DEFAULT: "📝"
    };
    return icons[activityType] || icons.DEFAULT;
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: '"IBM Plex Mono", monospace'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      padding: "2rem",
      fontFamily: '"IBM Plex Mono", monospace'
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          padding: "1.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "700",
              background: "linear-gradient(to right, #f97316, #ef4444)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "0.5rem"
            }}>
              Developer Dashboard
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
              Welcome back, {userProfile?.displayName || "Developer"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "transparent",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              borderRadius: "0.5rem",
              color: "#ef4444",
              cursor: "pointer",
              fontFamily: '"Space Mono", monospace',
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            LOGOUT
          </button>
        </div>

        {/* User Profile Card */}
        <div style={{
          padding: "1.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "2rem"
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#f97316",
            marginBottom: "1rem"
          }}>
            Profile Information
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <div>
              <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.25rem" }}>EMAIL</p>
              <p style={{ color: "#fff" }}>{userProfile?.email}</p>
            </div>
            <div>
              <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.25rem" }}>DISPLAY NAME</p>
              <p style={{ color: "#fff" }}>{userProfile?.displayName}</p>
            </div>
            <div>
              <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.25rem" }}>MEMBER SINCE</p>
              <p style={{ color: "#fff" }}>{formatDate(userProfile?.createdAt)}</p>
            </div>
            <div>
              <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.25rem" }}>LAST LOGIN</p>
              <p style={{ color: "#fff" }}>{formatDate(userProfile?.lastLogin)}</p>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div style={{
          padding: "1.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#f97316",
            marginBottom: "1rem"
          }}>
            Recent Activity
          </h2>

          {activities.length === 0 ? (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "2rem" }}>
              No activities recorded yet.
            </p>
          ) : (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {activities.map((activity, index) => (
                <div
                  key={activity.id || index}
                  style={{
                    padding: "1rem",
                    borderBottom: index < activities.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                  }}
                >
                  <div style={{ fontSize: "1.5rem" }}>
                    {getActivityIcon(activity.activityType)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#fff", fontWeight: "500", marginBottom: "0.25rem" }}>
                      {activity.activityType.replace(/_/g, " ")}
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                      {formatDate(activity.timestamp)}
                    </p>
                    {activity.details && Object.keys(activity.details).length > 0 && (
                      <p style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        {JSON.stringify(activity.details)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;