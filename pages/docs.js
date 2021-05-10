import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@rehooks/local-storage';
import reactor from '../reactor';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10)
  }
}));

function Docs({ disributorsData }) {
  const classes = useStyles();
  const router = useRouter();
  const { password } = useLocalStorage('password');
  const validPasswords = disributorsData.map((item) => item.password);

  useEffect(() => {
    if (!validPasswords.includes(password)) {
      router.push('/login');
    }
  }, []);

  return <div className={classes.root}>Docs</div>;
}

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const disributorsData = await reactor.getCollection('mQbnHW9wcV79q9SWOfXN');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  return {
    props: {
      disributorsData,
      footerData
    }
  };
}

export default Docs;
