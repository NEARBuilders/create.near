const { MarkdownViewer } = VM.require("devs.near/widget/markdown.view") || {
  MarkdownViewer: () => null,
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  background-color: #333;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 96px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const PreviewContent = styled.div`
  color: #333;
  font-size: 16px;
`;

const Select = styled.select``;

const Option = styled.option``;

const Label = styled.label`
  margin-right: 10px;
`;

const Button = styled.button`
  // this could take in theme
  padding: 10px 20px;
`;

const ModalBox = styled.div`
  background-color: white;
  min-width: 400px;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1003;
`;

const draftKey = "draft";
const savedEmbedPathKey = `${context.accountId}-Saved-Post-Path-Key`

const savedEmbedPath = Storage.get(savedEmbedPathKey)

console.log("savedEmbedPath", savedEmbedPath)

function onStoreSavedEmbedPath(path) {
  Storage.set(savedEmbedPathKey, path)
}

const set = (k, v) => {
  Storage.privateSet(k, v);
};

const get = (k) => {
  return Storage.privateGet(k);
};

const draft = get(draftKey);
const defaultViewMode = get("viewMode");
const defaultPreview = get("preview");
const defaultEditor = get("editor");
const defaultLanguage = get("language");
const defaultType = get("type");

if (
  draft === null ||
  viewMode === null ||
  defaultPreview === null ||
  defaultEditor === null ||
  defaultLanguage === null ||
  defaultType === null
) {
  return "";
}

const [content, setContent] = useState(draft);
const [viewMode, setViewMode] = useState(defaultViewMode || "single"); // 'single' or 'split'
const [showPreview, setShowPreview] = useState(defaultPreview || false);
const [type, setType] = useState(defaultType || "");
const [editor, setEditor] = useState(defaultEditor || "");
const [language, setLanguage] = useState(defaultLanguage || "md");
const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
const [isPostModalOpen, setIsPostModalOpen] = useState(false);
const [savingPath, setSavingPath] = useState(`${context.accountId}/every/document/test`)

function onSaveModalOpenChange() {
  setIsSaveModalOpen((prev) => !prev)
}

function onPostModalOpenChange() {
  setIsPostModalOpen((prev) => !prev)
}

function onChangePath(value) {
  setSavingPath(value)
}

const handleToggleViewMode = () => {
  const newMode = viewMode === "single" ? "split" : "single";
  set("viewMode", newMode);
  setViewMode(newMode);
  set("preview", false);
  setShowPreview(false);
};

const handleTogglePreview = () => {
  set("preview", !showPreview);
  setShowPreview(!showPreview);
};

const editors = [
  {
    value: "",
    label: "default textarea",
  },
  {
    value: "devs.near/widget/markdown.SimpleMDE",
    label: "SimpleMDE",
  },
  {
    value: "devs.near/widget/markdown.MarkdownEditorIframe",
    label: "MarkdownEditorIframe",
  },
];

const languages = [
  {
    value: "md",
    label: "Markdown",
  },
  {
    value: "json",
    label: "JSON",
  },
];

const types = [
  {
    value: "document",
    label: "Document",
  },
];

const data = Social.get("rambo-dev.near/every/document/*");

const postsArray = Object.values(data).map(JSON.parse);
const contentFound =
  postsArray.filter((post) => {
    return post.body == content;
  }).length > 0;


const DefaultEditor = ({ value, onChange, onBlur }) => (
  <EditorTextarea
    placeholder="Start typing..."
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

return (
  <PageContainer>
    <Header>
      <div>
        {viewMode === "single" && (
          <Button onClick={handleTogglePreview}>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        )}
        <Button onClick={handleToggleViewMode}>Toggle View Mode</Button>
      </div>
      <div>
        <Widget
          src="devs.near/widget/modal.layout"
          props={{
            open: isSaveModalOpen,
            onOpenChange: onSaveModalOpenChange,
            toggle: (
              <Button
                className="classic"
                disabled={!content}
              >
                <>
                  <i className={"bi bi-save"} />
                  save
                </>
              </Button>
            ),
            content: (
              <div className="w-100">
                <ModalBox>
                  <Widget
                    src={"devs.near/widget/modal.create"}
                    props={{
                      creatorId: context.accountId,
                      path: savingPath,
                      onChangePath: onChangePath,
                      data: JSON.stringify({ body: content }),
                      onOpenChange: onSaveModalOpenChange,
                      onStoreSavedEmbedPath,
                    }}
                  />
                </ModalBox>
              </div>
            ),
          }}
        />
        <Widget
          src="devs.near/widget/modal.layout"
          props={{
            open: isPostModalOpen,
            onOpenChange: onPostModalOpenChange,
            toggle: (
              <Button
                className="classic"
                disabled={!contentFound}
              >
                <>
                  <i className={"bi bi-send"} />
                  post
                </>
              </Button>
            ),
            content: (
              <div className="w-100">
                <ModalBox>
                  <Widget
                    src={"devs.near/widget/modal.post"}
                    props={{
                      creatorId: context.accountId,
                      path: savingPath,
                      type: type,
                      onOpenChange: onPostModalOpenChange,
                      savedEmbedPath,
                    }}
                  />
                </ModalBox>
              </div>
            ),
          }}
        />
      </div>
    </Header>
    <div>
      <Label>type:</Label>
      <Select
        onChange={(e) => {
          set("type", e.target.value);
          setType(e.target.value);
        }}
      >
        {types &&
          types.map((it) => (
            <Option value={it.value} selected={it.value === type}>
              {it.label}
            </Option>
          ))}
      </Select>
      <Label>editor:</Label>
      <Select
        onChange={(e) => {
          set("editor", e.target.value);
          setEditor(e.target.value);
        }}
      >
        {editors &&
          editors.map((it) => (
            <Option value={it.value} selected={it.value === editor}>
              {it.label}
            </Option>
          ))}
      </Select>
      <Label>language:</Label>
      <Select
        onChange={(e) => {
          set("language", e.target.value);
          setLanguage(e.target.value);
        }}
      >
        {languages &&
          languages.map((it) => (
            <Option value={it.value} selected={it.value === language}>
              {it.label}
            </Option>
          ))}
      </Select>
    </div>
    {viewMode === "single" ? (
      <EditorWrapper key={editor}>
        {showPreview ? (
          <MarkdownViewer value={content} />
        ) : (
          <>
            {editor ? (
              <Widget
                src={editor}
                props={{
                  value: { content },
                  onChange: (v) => {
                    setContent(v);
                    set(draftKey, v);
                  },
                }}
              />
            ) : (
              <DefaultEditor
                value={content}
                onBlur={() => {
                  let v;
                  if (language === "json") {
                    v = JSON.stringify(JSON.parse(content), null, 2);
                    if (v !== "null") {
                      setContent(v);
                      set(draftKey, v);
                    }
                  }
                }}
                onChange={(e) => {
                  let v = e.target.value;
                  setContent(v);
                  Storage.privateSet(draftKey, v);
                }}
              />
            )}
          </>
        )}
      </EditorWrapper>
    ) : (
      <div style={{ display: "flex", height: "100%" }}>
        <EditorWrapper>
          {editor ? (
            <Widget
              src={editor}
              props={{
                value: { content },
                onChange: (v) => {
                  setContent(v);
                  set(draftKey, v);
                },
              }}
            />
          ) : (
            <DefaultEditor
              value={content}
              onBlur={() => {
                let v;
                if (language === "json") {
                  v = JSON.stringify(JSON.parse(content), null, 2);
                  if (v !== "null") {
                    setContent(v);
                    set(draftKey, v);
                  }
                }
              }}
              onChange={(e) => {
                let v = e.target.value;
                setContent(v);
                Storage.privateSet(draftKey, v);
              }}
            />
          )}
        </EditorWrapper>
        <EditorWrapper>
          <MarkdownViewer value={content} />
        </EditorWrapper>
      </div>
    )}
  </PageContainer>
);
