import { useRouter } from 'next/router'
 
export default function Page() {

  // requête api sur api/product?id=
  

  const router = useRouter()
  return <p>Post: {router.query.slug}</p>
}