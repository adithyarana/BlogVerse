import React, {useEffect , useState}from 'react';
import { Container , Postform } from '../components';
import service from '../appwrite/config';
import { useParams, useNavigate } from 'react-router-dom'; // to get values from url



function Editpost() {

    const [post, setPost] = useState(null);
    const {slug}= useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            service.getpost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })

            
        } else{
            navigate('/')
        }
    },[slug , navigate]);

    return post ? (
        <div className='py-8'>


            <Container>
                <Postform post={post}/>
            </Container>
            
        </div>
    ) : null;
}

export default Editpost;