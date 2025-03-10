document.getElementById("presentationForm").addEventListener("submit", async (e) => {e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        topic: document.getElementById("topic").value,
        slides: parseInt(document.getElementById("slides").value),
        keypoints: document.getElementById("keypoints").value.split(",")
    };

    try {
        const response = await fetch("http://localhost:8000/generate-presentation/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.getElementById("pptLink");
            link.href = downloadUrl;

            document.getElementById("downloadLink").style.display = "block";
        } else {
            alert("Error generating presentation. Try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert(" Failed to connect to the server.");
    }
});