import {useRouter}  from 'next/router';
import styles from '../styles/MenuBar.module.css'

export default function MenuBar(){
    const router = useRouter();

    return(
        <div className={styles.main}>
             <div onClick={()=>router.push('/')}>Home</div>
            <div onClick={()=>router.push('/general/1')}>General</div>
            <div onClick={()=>router.push('/technology/1')}>Technology</div>
            <div onClick={()=>router.push('/sports/1')}>Sports</div>

        </div>
    )
}
