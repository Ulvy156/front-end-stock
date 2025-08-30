import { useRouter } from "vue-router";

export default function useNavigation(router: string){
  useRouter().push(`/${router}`)
}
