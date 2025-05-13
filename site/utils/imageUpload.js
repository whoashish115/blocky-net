export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};

export const checkImage = (file) => {
  let err = ""
  if (!file)
      err = "File does not exists"

  if (!file.size)
      err = "Invalid File Size"

  if (file.size > 1024 * 1024 * 2 )
      err = "File is larger than 2mb"

  if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      err = "File format is incorrect"

  return err;
}

