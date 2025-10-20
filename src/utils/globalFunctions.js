/**
 * Gestiona las peticiones http por medio de axios en scroll infinito.
 *
 * @param {function} fetchingCallback Callback que realizar la petición de datos por medio de axios.
 * @param {number} offsetInPx Offset en pixeles.
 * @return {void}
 * @author Fahibram Cárcamo
 */
export async function handleFetchingInScroll(fetchingCallback, offsetInPx) {
  // Posición actual del scroll
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  
  // Altura total del documento
  const scrollHeight = document.documentElement.scrollHeight
  
  // Altura visible de la ventana
  const clientHeight = window.innerHeight
  
  if (scrollTop + clientHeight >= scrollHeight - offsetInPx) await fetchingCallback()
}