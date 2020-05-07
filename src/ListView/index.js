import React, { Component } from 'react';

class ListView extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    fetch('http://localhost:5000/received-data/')
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response =>{
        this.setState({ data: response})
        }
      );
  }

  render() {
    const {data } = this.state;
    return (
      <div>
        { data &&
          data.map((current) => {
            return (
              <div key={current.id}>
                {current.name}
                {current.email}
                {current['pizza-size']}
                {current['extra-ingredients']}
                <hr />
              </div>
            )
          })
        }

      </div>
    );
  }
}

export default ListView;
