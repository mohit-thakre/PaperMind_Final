import { toast } from "sonner";

export const handleSummarySave = async (
  userId,
  email,
  name,
  fileName,
  originalFileUrl,
  parsedText,
  summaryText
) => {
  try {
    const res = await fetch("/api/save-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        email,
        name,
        fileName,
        originalFileUrl,
        parsedText,
        summaryText,
      }),
    });

    const data = await res.json();
    console.log("Saved in Neon:", data);
  } catch (err) {
    console.error("Error saving summary:", err);
  }
};

export const handleFileUpload = (filesArray) => {
  const file = filesArray[0];

  if (!file || file.type !== "application/pdf")
    return alert("Please upload a PDF");
  setLoading(true);
  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64 = reader.result.split(",")[1];

    const res = await fetch("/api/upload-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Pdf: base64 }),
    });

    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (res.ok) {
      setFiles(data.url);
      const parser = await parsePDF(data.url);
      const summary = await summaryGemini(parser?.substring(0, 1000));

      handleSummarySave(
        userId,
        user.emailAddresses[0].emailAddress,
        user.fullName,
        "papermind",
        data.url,
        parser,
        summary
      );
    } else {
      setLoading(false);
      alert("Upload failed");
    }
  };

  reader.readAsDataURL(file);
};


export const getUser = async(userId)=>{
  try {
    const data = await fetch("/api/get-user");
    const res = await data.json();
    console.log("user fetched for upload pdf",res)
    
  } catch (error) {
    toast.error(error.message)
    console.error(error);
  }
}