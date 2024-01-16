const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Panel = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
`;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button``;

const Label = styled.label`
  margin-right: 10px;
`;

const types = [
  {
    value: "/*__@appAccount__*//widget/markdown.edit",
    label: "Markdown",
  },
  { value: "/*__@appAccount__*//widget/code.edit", label: "Code" },
  { value: "/*__@appAccount__*//widget/canvas.edit", label: "Canvas" },
];

const adapters = [
  {
    value: null,
    label: "Social DB",
  },
  {
    value: "/*__@appAccount__*//widget/adapter.sputnik-dao",
    label: "Sputnik DAO",
  },
];

// const { Modal } = VM.require("buildhub.near/widget/components.Modal") || {
//   Modal: () => <>hello</>,
// };

function PanelHeader({
  types,
  handleTypeChange,
  handleAdapterChange,
  adapter,
  value,
}) {
  return (
    <Header>
      <div>
        <Label>type:</Label>
        <Select onChange={(e) => handleTypeChange(e.target.value)}>
          {types &&
            types.map((it) => <Option value={it.value}>{it.label}</Option>)}
        </Select>
      </div>
      <Widget
        src="devs.near/widget/hyperfile"
        props={{ path: props.path, data: value }}
      />
      <div>
        <Label>adapter:</Label>
        <Select onChange={(e) => handleAdapterChange(e.target.value)}>
          {adapters &&
            adapters.map((it) => <Option value={it.value}>{it.label}</Option>)}
        </Select>

        <Button disabled={!value} onClick={(v) => adapter.create(v)}>
          Publish
        </Button>
      </div>
    </Header>
  );
}

const [editorValue, setEditorValue] = useState("");
const [activeTab, setActiveTab] = useState("editor");

const [editorSrc, setEditorSrc] = useState(
  "/*__@appAccount__*//widget/markdown.edit"
);
const [viewerSrc, setViewerSrc] = useState(
  "/*__@appAccount__*//widget/markdown.view"
);

const socialDbAdapter = {
  get: (path, blockHeight) => {
    if (!path) console.log("path not provided") && null;
    if (!blockHeight) blockHeight = "final";
    return Social.get(path, blockHeight);
  },
  create: (v) => {
    const id = "routes";
    const parts = path.split("/");
    Social.set({
      [parts[1]]: {
        [parts[2]]: {
          "": code,
        },
      },
    });
    return Social.set(
      {
        thing: {
          [id]: {
            "": v,
            metadata: {
              type: "app",
            },
          },
        },
      },
      {
        force: "true",
        onCommit: (v) => {
          console.log(v);
        },
        onCancel: (v) => {
          console.log(v);
        },
      }
    );
  },
};

const [selectedItem, setSelectedItem] = useState("efiz.near/thing/routes");
const [adapter, setAdapter] = useState(socialDbAdapter);

function handleTypeChange(value) {
  setEditorSrc(value);
}

function handleViewerSrcChange(value) {
  setViewerSrc(value);
}

const handleTabClick = (tab) => {
  setActiveTab(tab);
};

function handleAdapterChange(value) {
  const adapter = value ? VM.require(value) : socialDbAdapter;
  setAdapter(adapter);
}

function Editor({ value, setEditorValue }) {
  return (
    <Widget
      src={"/*__@appAccount__*//widget/provider"}
      props={{
        path: value,
        editorValue,
        blockHeight: "final",
        setEditorValue,
        Children: (p) => <Widget src={editorSrc} props={p} />,
      }}
    />
  );
}

function Viewer({ value }) {
  return <Widget src={viewerSrc} props={{ value }} />;
}

function Sidebar() {
  return (
    <Widget
      src="/*__@appAccount__*//widget/sidebar"
      props={{ handleItemClick: (v) => setSelectedItem(v) }}
    />
  );
}

return (
  <Container>
    {/* <Panel style={{ maxWidth: "200px" }}>
      <Wrapper key={editorSrc}>
        <Sidebar />
      </Wrapper>
    </Panel> */}
    <Panel>
      <PanelHeader
        value={editorValue}
        types={types}
        handleTypeChange={handleTypeChange}
        handleAdapterChange={handleAdapterChange}
        adapter={adapter}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item pointer">
            <a
              className={`nav-link ${activeTab === "editor" ? "active" : ""}`}
              onClick={() => handleTabClick("editor")}
            >
              Edit
            </a>
          </li>
          <li className="nav-item pointer">
            <a
              className={`nav-link ${activeTab === "preview" ? "active" : ""}`}
              onClick={() => handleTabClick("preview")}
            >
              Preview
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              activeTab === "editor" ? "show active" : ""
            }`}
            id="editorTab"
            key={editorSrc}
          >
            <Wrapper key={editorSrc}>
              <Editor value={selectedItem} setEditorValue={setEditorValue} />
            </Wrapper>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "preview" ? "show active" : ""
            }`}
            id="previewTab"
            key={viewerSrc}
          >
            <Wrapper key={viewerSrc}>
              <Viewer value={editorValue} />
            </Wrapper>
          </div>
        </div>
      </div>
    </Panel>
  </Container>
);
