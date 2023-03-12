interface ApiResponse {
    responseCode: number,
    data?: unknown,
    errorMessage?: string
}

export const doGet = async (url: string, containsRecordsField?: boolean) : Promise<ApiResponse> => {
    console.log("GET URL: " + url);
    try{
        const apiKey = ""+ process.env.REACT_APP_API_KEY;

        const headers: HeadersInit = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${apiKey}`);
        let response = await fetch(url, {
            method: 'GET',
            headers
        });
        if(response.status !== 200) 
            return {responseCode: 79, errorMessage: `HTTP ERROR: ${response.status}. Please try again later`};
        let responseToJson = await response.json();
        console.log("Response gotten (GET) is: ", responseToJson);
        return {responseCode: 99, data: containsRecordsField ? responseToJson.records : responseToJson};
    }catch(ex){
        console.log(ex);
        return {responseCode: 79, errorMessage: "Error fetching from service"};
    }
}