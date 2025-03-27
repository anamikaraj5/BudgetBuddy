import React from "react"
import delete1 from '../assets/images/delete.svg'


const DeleteBudget = ({ category, month }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this budget?")) return

        try {
        const response = await fetch("/api/deletebudget", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ Category: category, Month: month }),
        })

        if (!response.ok) {
            alert("Failed to delete budget")
        } 

        alert("Budget deleted successfully!")
        window.location.reload()
        } 
        
        catch (error) {
        console.error("Error:", error)
        alert("Error deleting budget")
        }
    }

    return (
        <button onClick={handleDelete}>
        <img src={delete1} className="h-[30px]" alt="Delete" />
        </button>
    )
}

export default DeleteBudget