export default
  div.lift(({ name, description }) =>
    div
      .add(h1.text(name))
      .add(p.text(description))
  )
