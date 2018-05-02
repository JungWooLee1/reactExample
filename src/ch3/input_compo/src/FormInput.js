import React, {Component} from 'react'
import PropTypes from 'prop-types'


// 우편 번호 입력 컴포넌트

export default class FormInput extends Component {
	constructor (props) {
		super(props)

		// 컴포넌트를 사용하는 html elemnet 의 value값을 v 변수에 입력합니다.
		const v = this.props.value

		// 현재 컴포넌트의 state를 초기화합니다.  
		// value,isOK라는 변수를 만들고 html엘리먼트의 value값인 v변수를 이용하여 초기값을 입력합니다.
		this.state = {
			value: v,
			isOK: this.checkValue(v)
		}
	}

	// 패턴에 맞는지 확인하기 --(2)
	// 패턴만 체크합니다. ==> 즉 우편번호 형식인지 , 이메일 형식 등등을 체크합니다.
	checkValue (s) {
		
		// html 엘리먼트에 pattern 속성이 없으면 true를 반환합니다.
		if (this.props.pattern === null)
		{
			return true
		}

		// 엘리먼트의 pattern을 이용하여 패턴을 확인하고 결과를 반환합니다.
		return this.props.pattern.test(s)
	}


	// Change 이벤트에 대한 lister함수 인듯 합니다.
	// filter와 패턴을 체크합니다.
	// filter는 숫자입력, 영문 대문자만 입력 등등을 나타탭니다.

	handleChange (e) {
		
		// 이벤트가 발생된 객체를 가르키는 포인터 역활을 하는 것이 e.target입니다.
		const v = e.target.value

		// 필터가 있다면 필터를 적용합니다.
		const filter =  this.props.filter


		let newValue = v

		if(filter !== null) {
			newValue = newValue.replace(filter, '')
		}

		// 여기서의 this 는 컴포넌트 클래스를 나타냅니다.
		// newIsOK 는 새로운 입력값이 패턴에 맞는지에 대한 정보를 나타냅니다. (boolean)

		const newIsOK = this.checkValue(newValue)

		this.setState({  // 컴포넌트의 상태를 변경합니다.
			value: newValue,
			isOK: newIsOK
		})

		// 이벤트를 실행합니다. --(4)
		
		// 만약 부모의 onChange 속성이 존재한다면
		// 부모의 onChange 이벤트를 수행하고 객체 리터럴을 통해 생성한 객체를 매개변수로 전달합니다.
		
		if(this.props.onChange) {
			this.props.onChange ({
				target: this,
				value: newValue,
				isOK: newIsOK,
				name: this.props.name
			})
		}
	}

	// 프로퍼티가 변경되었을 때 
	// 만약 부모 html엘리먼트의 속성이 변경되었을 때 해당 메서드를 호출합니다. 
	// 엘리먼트의 속성값이 변경될때마다 해당 메서드가 수행됩니다. 

	componentWillReceiveProps (nextProps) {
		this.setState({
			value: nextProps.value,
			isOK: this.checkValue(nextProps.value)
		})
	}


	// 렌더링 --(5)

	render () {
		
		// msg라는 상수를 선언하고 
		const msg = this.renderStatusMessage()

		return (<div>
			<label>{this.props.label}:<br />
				<input type='text'
					name={this.props.name}
					placeholder={this.props.placeholder}
					value={this.state.value}
					onChange={e => this.hanleChange(e)} />
				{msg}
			</label>
		</div>)
	}

	renderStatusMessage () {
		
		// 스타일 정보를 가지고 있는 so라는 상수를 선언합니다.
		const so = {
			margin: '8px',
			padding: '8px',
			color: 'white'
		}

		// 메세지 정보를 가지고 있는 msg라는 변수를 선언합니다.
		let msg = null

		if (this.state.isOK) {
			// 현재 state값이 OK 일때 
			// => 즉 패턴에 맞는 값이 컴포넌트의 value값에 존재할때 
			// 백그라운드 값을 초록색으로 설정하고 so 상수의 스타일로 msg에 OK 메세지를 출력합니다. 
			so.backgroundColor = 'green'
			msg = <span style={so}>OK</span>

		} else {
			// NG일 때 (빈 문자열이라면 출력하지 않습니다.)
			// 패턴에 맞지 않는 문자열일때는 
			// 백그라운드의 값을 빨간색으로 설정하고, so 상수의 스타일로 msg에 NG 메세지를 출력합니다.

			if (this.state.value !=='') {

				so.backgroundColor = 'red'
				msg = <span style={so}>NG</span>

			}
		}

		return msg;
	}

}





// 프로퍼티의 자료형을 정의합니다 -- (6)

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	filter: PropTypes.object,
	pattern: PropTypes.object,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func
}

	// 프로퍼티의 초깃값을 정의합니다. --(7)

FormInput.defaultProps = {
	filter: null,
	pattern: null,
	value: '',
	placeholder: '',
	onChange: null
}	








