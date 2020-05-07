import React from "react";
import FormBuilder from "./FormBuilder";
import data from "./beta_test/survey-test.json";
import ListView from "./ListView";

class App extends React.Component {
  state = {
    view: "add"
  };

  changeView(view) {
    this.setState({ view });
  }

  render() {
    const formStructure = data;
    const { view } = this.state;

    return (
      <div className="App">
        <div>
          <button disabled>Add Survey</button>
          <button onClick={() => this.changeView("add")}>Response Survey</button>
          <button onClick={() => this.changeView("list")}>List Stored Responses</button>
        </div>
        {view === "add" && <FormBuilder {...formStructure} />}
        {view === "list" && <ListView />}
      </div>
    );
  }
}

export default App;
