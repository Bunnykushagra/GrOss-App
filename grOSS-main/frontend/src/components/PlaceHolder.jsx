import React from "react";

function PlaceHolder() {
	return (
		<div
			className='card'
			style={{
				margin: "5%",
				marginTop: "5em",
				backgroundColor: "#0d1117",
				border: "1px #30363d solid",
			}}>
			<h5 className='card-header placeholder-glow'>
				<span className='placeholder col-6'></span>
			</h5>
			<div className='card-body'>
				<h5 className='card-title placeholder-glow'>
					<span className='placeholder col-4'></span>
				</h5>
				<p className='card-text placeholder-glow'>
					<span className='placeholder col-7'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-6'></span>
					<span className='placeholder col-8'></span>
				</p>
				<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
					<button
						className='btn btn-success disabled placeholder col-2'
						style={{
							borderStyle: "solid",
						}}></button>
					<button
						className='btn btn-sucess disabled placeholder col-2'
						style={{
							borderStyle: "solid",
						}}></button>
				</div>
			</div>
		</div>
	);
}

function ResultPlaceHolder() {
	return (
		<div
			className='card'
			style={{
				margin: "5%",
				marginTop: "5em",
				backgroundColor: "#0d1117",
				border: "1px #30363d solid",
			}}>
			<h5 className='card-header placeholder-glow'>
				<span className='placeholder col-6'></span>
			</h5>
			<div className='card-body'>
				<h5 className='card-title placeholder-glow'>
					<span className='placeholder col-4'></span>
				</h5>
				<p className='card-text placeholder-glow'>
					<span className='placeholder col-7'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-6'></span>
					<span className='placeholder col-8'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-4'></span>
					<span className='placeholder col-6'></span>
					<span className='placeholder col-7'></span>
				</p>
			</div>
		</div>
	);
}

export default PlaceHolder;
export { ResultPlaceHolder };
