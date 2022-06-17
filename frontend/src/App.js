import React, { Component } from 'react';
// import axios from 'axios';
import "./App.css"

class Home extends Component {

	state = {
		show: false,
		data: [],
		rating: 1,
	}

	componentDidMount = async() => {
		// Write your code here 
		this.handleGetData()
	}
	handleGetData = async() => {
		// Write your code here 
    const response = await fetch('http://localhost:8001/courses/get')
    this.setState({data: await response.json()})
	}
	handleApply = async (id) => {
		// Write your code here
    const response = await fetch(`http://localhost:8001/courses/enroll/${id}`, {
            method: 'POST',
            headers: { 'Content-Type':'application/json'}
          })
    
          const res = await response.json()
          if (response.status === 200) {
            alert(res.message)
          }else if( response.status === 403){
            alert(res.error)
          }
          this.handleGetData()

	};
	handleRating = (e) => {
		// Write your code here
		this.setState({
			rating: e.target.value
		})
	}
	handleAddRating = async (id) => {
		// Write your code here
		    const response = await fetch(`http://localhost:8001/courses/rating/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({rating: this.state.rating})
          })

          const res = await response.json()
          if( response.status === 403){
            alert(res.error)
          }
          this.handleGetData()
	}
	handleDrop = async (id) => {
		// Write your code here 
    const response = await fetch(`http://localhost:8001/courses/drop/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type':'application/json'}
          })
    
          const res = await response.json()
          if (response.status === 200) {
            alert(res.message)
          }else if( response.status === 403){
            alert(res.error)
          }
          this.handleGetData()
	}

	render() {
		return (
			<div className="home">
				<header>
					<h2>ABC Learning</h2>
				</header>
				<div className="cardContainer">
					{this.state.data.map(course => (
						<div className="card">
							<ul>
								<div className="header">
									<li>{course.courseName}</li>
									<li>{course.courseDept}</li>
									<li>{course.description}</li>
									{course.isApplied ?
										<li>
											{!course.isRated &&
												<li>Rate:
													<select className="rating" name="rating" value={this.state.rating} onChange={this.handleRating}>
														<option>1</option>
														<option>2</option>
														<option>3</option>
														<option>4</option>
														<option>5</option>
													</select>
													<button className="rate" onClick={this.handleAddRating.bind(this, course._id)}>Add</button>
												</li>
											}
											<button className="drop" onClick={this.handleDrop.bind(this, course._id)}>Drop Course</button>
										</li>
										:
										<li><button className="btn" onClick={this.handleApply.bind(this, course._id)}>Apply</button></li>
									}
								</div>
								<div className="footer">
									<li>{`${course.duration}hrs . ${course.noofRatings}Ratings . ${course.rating}/5`}</li>
								</div>
							</ul>
						</div>
					))}
				</div>

			</div>
		);
	}
}
export default Home;