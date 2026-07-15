export const saveDraftAPI = (draft) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random API success/failure
      const success = Math.random() > 0.3;

      if (success) {
        resolve({
          success: true,
          data: draft,
        });
      } else {
        reject(new Error("Failed to save draft."));
      }
    }, 1500);
  });
};