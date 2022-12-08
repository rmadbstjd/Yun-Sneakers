export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  const result = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });
  let img = await result.json();
  return img.url;
}
// 위와 아래는 같은 코드이다. 위에 코드 중 let img = await result.json();을 하지 않아 cors 에러가 발생헀었다.
/*export async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => data.url);
  }*/
