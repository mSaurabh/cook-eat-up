import { useEffect, useState } from "react";

export const useFetch = (url: string, method = "GET") => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<IOptions>({} as IOptions);

  const postData = (postDataObj: any) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postDataObj),
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (fetchOptions?: IOptions) => {
      setIsPending(true);

      try {
        const reqFetchOptions = {
          ...fetchOptions,
          signal: controller.signal,
        };

        const res = await fetch(url, reqFetchOptions);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const jsonData = await res.json();

        setIsPending(false);
        setData(jsonData);
        setError("");
      } catch (err: any) {
        console.log(err);
        if (err.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          setError("Could not fetch the data");
          setIsPending(false);
          console.error(err.message);
        }
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};

interface IOptions {
  method: "GET" | "POST";
  headers: any;
  body: any;
}
