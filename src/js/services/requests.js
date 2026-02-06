const postData = async (url, data) => {
    // отправляем запрос
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

// get request
const getResource = async (url) => {
    // отправляем запрос
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};
