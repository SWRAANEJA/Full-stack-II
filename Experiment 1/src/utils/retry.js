export async function retry(apiFunction, retries = 3) {
  try {
    return await apiFunction();
  } catch (error) {
    if (retries <= 1) {
      throw error;
    }

    console.log("Retrying API...");

    return retry(apiFunction, retries - 1);
  }
}