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

const [value, setValue] = useState("");

const handleLoad = () => {
  if (props.setPath) props.setPath(value);
  if (props.closeModal) props.closeModal();
};

return (
  <Wrapper>
    <h3>load</h3>
    <Form>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Form>
    <FormGroup>
      <button className="btn btn-success mb-1" onClick={handleLoad}>
        submit
      </button>
    </FormGroup>
  </Wrapper>
);
