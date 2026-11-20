import { useState } from 'react';
import './App.css'
import Modal from './Modal';

function App() {
  const [post, setPost]=useState([
    {title: '경기도',
      date: '11월 17일',
      content : '수원시, 성남시, 용인시, 화성시, 부천시, 안산시, 안양시, 남양주시, 평택시, 시흥시, 김포시, 광명시, 군포시, 의왕시, 하남시, 오산시, 이천시, 양평군, 여주시, 동두천시, 가평군, 포천시, 연천군'
    },
    {title: '강원도',
      date: '11월 18일',
      content : '춘천시, 원주시, 강릉시, 동해시, 태백시, 속초시,삼척시, 홍천군,횡성군,영월군,평창군,정선군,철원군,화천군,양구군,인제군'
    },
    {title: '제주도',
      date: '11월 19일',
      content : '제주시, 서귀포시'
    },
  ]);
  const [postnum, setPostnum] = useState(0);
  const [clickup, setClickup]=useState([0,0,0]);
  const [modal, setModal]=useState(false);
  const [input, setInput]=useState('');

  const delBtn = (i)=>{
                let copy = [...post];
                copy.splice(i, 1);
                setPost(copy);

                let copy2 = [...clickup];
                copy2.splice(i, 1);
                setClickup(copy2);
              }

  const addBtn = () => {
            let copy = [...post];
            copy.unshift({
              title: input,
              date: '11월 20일',
              content: ''
            });
            setPost(copy);
            setInput('');   // input 초기화

            let copy2 = [...clickup];
            copy2.unshift(0);
            setClickup(copy2);
          }

  const likeBtn = (i) => (e) => {
                let copy = [...clickup];
                copy[i] = clickup[i] + 1;
                setClickup(copy);
                e.stopPropagation();
              }

  return (
    <>
      <div className='App'>
        <div className='black-nav'>
          <h4 style={{color:'red', fontSize:'20px'}}>React Blog</h4>
        </div>

        {
          post.map((p, i)=>
            <div className="list" key={i}>
              <h4 onClick={()=>{
                setModal(true);
                setPostnum(i);
              }}>{p.title}

              <span onClick={likeBtn(i)}>👍</span>{clickup[i]}</h4>
              
              <p>{p.date}</p>

              <button onClick={delBtn}>글 삭제</button>
            </div>
          )
      }

          <input type="text" onChange={(e)=>{
            setInput(e.target.value);
          }} value={input} />

          <button onClick={addBtn}>글 추가</button>
          

          {
            modal === true && <Modal post={post} postnum={postnum} color={'pink'} setModal={setModal}/>
          }
          
      </div>
    </>
  )
}

export default App