function search(event) {
  if (event.keyCode === 13) {
    const query = event.target.value;
    window.location.href = "/pesquisa?busca=" + query;
  }
}
