import { useNavigate } from "react-router-dom";

export const handleLogout = async (navigate) => {
  try {
    // Clear items database
    const clearItemsResponse = await fetch("http://localhost:3000/api/items", {
      method: "DELETE",
    });

    if (!clearItemsResponse.ok) {
      alert("Failed to clear items!");
      return;
    }

    // Clear details database
    const clearDetailsResponse = await fetch("http://localhost:3000/api/remove-details", {
      method: "DELETE",
    });

    if (!clearDetailsResponse.ok) {
      alert("Failed to clear details!");
      return;
    }

    alert("Items and Details cleared successfully!");
    navigate("/login"); // Navigate to login page
  } catch (error) {
    console.error("Error during logout:", error);
    alert("An error occurred while logging out.");
  }
};
