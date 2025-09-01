export function addClassNameById(id:string, cn: string) {
  document.getElementById(id)?.classList.add(cn);
}

export function removeClassNameById(id:string, cn: string) {
  document.getElementById(id)?.classList.remove(cn);
}
