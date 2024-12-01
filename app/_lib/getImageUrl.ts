const cache: {
    [key: string]: { url: string; previewUrl: string; timestamp: number };
} = {};

export async function getImageUrl(
    articleName: string,
): Promise<{ url: string; previewUrl: string }> {
    const cacheKey = articleName.toLowerCase();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (cache[cacheKey] && now - cache[cacheKey].timestamp < oneDay) {
        console.log(articleName + " Cache hit");
        return {
            url: cache[cacheKey].url,
            previewUrl: cache[cacheKey].previewUrl,
        };
    }

    const apiUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&`;
    const query = `q=${articleName}&image_type=photo&safesearch=true`;
    const imageUrl = `${apiUrl}${query}`;
    const response = await fetch(imageUrl);
    const data = await response.json();
    const url = data.hits[0].webformatURL;
    const previewUrl = data.hits[0].previewURL;

    cache[cacheKey] = { url, previewUrl, timestamp: now };
    console.log(articleName + " Cache miss");

    return { url: url, previewUrl: previewUrl };
}
