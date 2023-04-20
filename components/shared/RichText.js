import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4vh'
  },
  richTxt: {
    zIndex: 1,
    '& .ql-size-huge': {
      display: 'inline',
      ...theme.typography.h1
    },
    '& .ql-size-large': {
      ...theme.typography.h2
    },
    '& p': {
      ...theme.typography.body1
    },
    '& p:first-child': {
      marginTop: 0
    },
    '& p:last-child': {
      marginBottom: 0
    },
    '& ul': {
      margin: 0,
      paddingInlineStart: 14,
      listStyle: 'disc'
    },
    '& strong': {
      fontWeight: 'bold !important'
    },
    '& a': {
      textDecoration: 'underline'
    },
    '& img': {
      maxWidth: '100%'
    }
  },
  center: {
    paddingInline: 32,
    textAlign: 'center'
  },
  addTopPadding: {
    paddingTop: 'calc(50vh - 163px)'
  }
}));

export default function RichText({
  html,
  className,
  style = {},
  headerClassName
}) {
  const classes = useStyles();
  const ref = useRef(null);
  const router = useRouter();
  const richTextHeaderRegEx = /<p.*class="ql-size-huge".*?<\/p>/;
  const header = html?.match(richTextHeaderRegEx);
  const body = html?.replace(richTextHeaderRegEx, '');

  useEffect(() => {
    ref.current.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.match(/\?target=/)) {
          e.preventDefault();
          router.push(`/${href.split('/').pop()}`, undefined, {
            shallow: true
          });
        }
      });
    });
  }, []);

  return (
    <div ref={ref} className={classes.wrapper}>
      {header && header[0] && (
        <Typography
          className={cx(classes.richTxt, headerClassName)}
          style={style}
          component='div'
          dangerouslySetInnerHTML={{
            __html: header[0]
          }}
        />
      )}
      {body && (
        <Typography
          className={cx(classes.richTxt, className)}
          style={style}
          component='div'
          dangerouslySetInnerHTML={{
            __html: body
          }}
        />
      )}
    </div>
  );
}
