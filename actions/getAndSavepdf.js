export async function getPdf({ pdfId }) {
    const res = await fetch(`/api/get-single-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfId }),
    });
    const data = await res.json();
    console.log(data);
    return data?.pdf; 
  } 
  export async function saveSummary({ pdfId, parsedText, summaryText }) {
    try {
        const res = await fetch(`/api/save-summary`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pdfId,
              parsedText,
              summaryText,
            }),
          });
          const data = await res.json();
          console.log(data);
          return data;
    } catch (error) {
      console.error("Error saving summary:", error);
      return null;
    }
    
  }