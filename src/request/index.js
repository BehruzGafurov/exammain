const baseURL = import.meta.env.VITE_BASE_URL;

async function fetchRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text(); 
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw new Error(error.message || "Something went wrong :(");
    }
}

export async function getInvoices(query = "") {
    const url = `${baseURL}${query ? `?status=${query}` : ""}`;
    return fetchRequest(url);
}

export async function getInvoice(id) {
    const url = `${baseURL}/${id}`;
    return fetchRequest(url);
}

export async function deleteById(id) {
    const url = `${baseURL}/${id}`;
    const options = { method: "DELETE" };
    const result = await fetchRequest(url, options);

    
    if (typeof result === "string" && result.toLowerCase().includes("deleted")) {
        return "Success";
    }

    return result;
}

export async function updateById(id, newData) {
    const url = `${baseURL}/${id}`;
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
    };
    return fetchRequest(url, options);
}

export async function addInvoice(data) {
    const url = baseURL;
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    return fetchRequest(url, options);
}
