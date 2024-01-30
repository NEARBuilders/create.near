const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const creatorId = props.creatorId

const [path, setPath] = useState(props.path ?? "");
const [content, setContent] = useState(`[EMBED](${path})`);

function handlePost() {
  console.log("CALLED")
  console.log("ACCOUNT =>", creatorId)
  const data = Social.get(`${creatorId}/every/document/test`);

  const lastSaved = data.test
  console.log("lastSaved", lastSaved)
}

return (
  <Wrapper>
    <h3>post</h3>
    <Form>
      <textarea
        className="form-control mb-3"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Form>
    <FormGroup>
      <button className="btn btn-success mb-1" onClick={handlePost}>
        submit
      </button>
    </FormGroup>
  </Wrapper>
);
