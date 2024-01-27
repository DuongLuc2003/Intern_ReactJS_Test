import { useEffect, useRef } from 'react'

const UploadWidget = ({ onUploadSuccess }: { onUploadSuccess: (imageUrl: string) => void }) => {
   const cloudinaryRef: any = useRef();
   const widgetRef: any = useRef();

   useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dkjk0lyhn',
      uploadPreset: 'nm0pqcmy'
    }, function (error: any, result: any) {
       if (!error && result && result.event === "success") {
           // Trích xuất đường dẫn của hình ảnh từ kết quả và gọi hàm callback
           const imageUrl = result.info.secure_url;
           onUploadSuccess(imageUrl);
       }
    })
   },[onUploadSuccess]);

   return (
      <button onClick={() => widgetRef.current.open()} name='imgUrl'>
        Upload
      </button>
   )
}

export default UploadWidget