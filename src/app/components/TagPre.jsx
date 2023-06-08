/**
 * The function returns a preformatted block of text that includes a JSON object and any additional children passed as props.
 * @returns The `TagPre` component is being returned, which takes in `json`, `children`, and any other
 * props passed to it. It renders a `pre` element with the `children` and `json` object stringified
 * with indentation of 2 spaces.
 */
const TagPre = ({ json, children, ...props }) => {
  return (
    <pre {...props}>{children}{JSON.stringify(json, null, 2)}</pre>
  )
}

export default TagPre
