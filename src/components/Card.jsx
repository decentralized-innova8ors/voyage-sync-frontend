import Image from "next/image"
const Card = ({ alt, href, title, content }) => {
  return (
    <div className="w-64 p-2">
      <Image alt={alt} src={href} width={300} height={400} className="mb-3"/>
      <p className="mb-3 text-lg font-semibold">{title}</p>
      <p>{content}</p>
    </div>
  )
}

export default Card