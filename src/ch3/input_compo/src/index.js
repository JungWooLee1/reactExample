import React from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'

class CustomForm extends React.Component {


	constructor (props) {
	

			super(props)
			// 컴포넌트 생성자에서 현재 컴포넌트의 상태값을 저장합니다.
			// 이메일과 휴대폰번호와 패턴이 맞는지 체크하는 allok 라는 boolean 변수를 선언합니다.
			this.state = {
				email: '',
				tel: '',
				allok: false
			}

			// oks 라는 배열을 선언합니다 => 용도파악중
			// oks는 연관배열 객체입니다.
			this.oks= {}
		
	}

	handleChange (e) {
		// 모든 항목이 OK인지 체크하는 메서드를 선언합니다.
		// name -> isok 인 key-value 값을 oks 객체에 입력합니다. 
		this.oks[e.name] = e.isOK
		this.setState({

			// 대괄호의 의미는 두가지로 유추해보려고 한다.
			// 첫번째 => e.name을 가지는 컴포넌트의 배열을 가지고 와서 각각 e.value와 매칭시킨다.
			// 두번째 => state 객체의 e.name key값에 e.value를  모두 입력시킨다. 
			/////////////////////////////////////////
			[e.name]: e.value,		
			/////////////////////////////////////////
			allok: (this.oks['email'] && this.oks['tel'])
		})
	}

	handleSubmit (e) {
		// json 객체를 String 객체로 변환해줍니다.
		window.alert(JSON.stringify(this.state))

		// 이벤트 완료 후에 refresh 같은 다른 이벤트를 하지 않고 추가적인 이벤트 전파를 막습니다.
		// 리엑트에서는 submit 후에 refresh 되는 것을 막기위해 사용합니다. => 아직 뭔소린지 .. ㅋㅋㅋ 
		e.preventDefault()

	}

	render () {
		const doChange =  e => this.handleChange(e)
		const doSubmit =  e => this.handleSubmit(e)

		// 이메일 패턴
		const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

		// ASCII 문자 이외 전부
		const asciiFilter = /[^\u0020-\u007e]+/g



		return (
			<form onSubmit={doSubmit}>
				<FormInput name='email' label='메일 주소'
					value={this.state.email}
					filter={asciiFilter}
					pattern={emailPat}
					onChange={doChange} />
				<FormInput name='tel' label='전화 번호'
					value={this.state.tel}
					// 입력 할때마다 검사하는 필터이고 패턴은 전체 문자열을 검사한다는 점에서 다른듯 ..
					filter= {/[^0-9-()+]/g}
					pattern={/^[0-9-()+]+$/} 
					onChange={doChange}
					/>
				<input type='submit' value='전송'
				disabled={!this.state.allok}/>
			</form>
		)
	}
}

// DOM을 변경합니다.
ReactDOM.render(
	<CustomForm />,
	document.getElementById('root')
)












