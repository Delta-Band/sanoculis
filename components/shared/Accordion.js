import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Plus as PlusIcon } from '@styled-icons/feather/Plus';
import RichText from './RichText';

const useStyles = makeStyles(theme => ({
  accordionWrapper: {},
  accordionItem: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid',
    '&:last-child': {
      borderBottom: '1px solid'
    }
  },
  accordionItemHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBlock: 16,
    cursor: 'pointer',
    '& > *': {
      transform: 'translateY(2px)'
    }
  },
  accordionItemBody: {
    overflow: 'hidden'
  },
  accordionItemRichTxt: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingInline: theme.spacing(2),
    // paddingTop: 0,
    '& .ql-size-huge': {
      ...theme.typography.h1
    },
    '& .ql-size-large': {
      ...theme.typography.h2,
      marginBlockEnd: 12
    },
    '& .ql-size-small': {
      ...theme.typography.caption
    },
    '& p': {
      ...theme.typography.body1,
      marginTop: 0
    },
    '& img': {
      maxWidth: '100%',
      marginBlock: 0,
      height: 'auto'
    },
    '& ul': {
      paddingLeft: theme.spacing(2),
      paddingBlock: theme.spacing(2),
      ...theme.typography.body1,
      marginBlock: 0
    },
    '& li:not(:last-child)': {
      paddingBottom: theme.spacing(2)
    }
  },
  plusIcon: {
    marginBlockStart: 1
  },
  customLinkButtonWrapper: {
    marginBottom: 6
  }
}));

export default function Accordion({ label, content }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={classes.accordionItem}>
      <div
        className={classes.accordionItemHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variants='body1'>{label}</Typography>
        </div>
        <motion.div
          animate={{
            rotate: expanded ? 45 : 0
          }}
          className={classes.plusIcon}
        >
          <PlusIcon size={28} />
        </motion.div>
      </div>
      <motion.div
        className={classes.accordionItemBody}
        initial='collapsed'
        animate={expanded ? 'expanded' : 'collapsed'}
        exit='collapsed'
        variants={{
          expanded: {
            opacity: 1,
            height: 'auto',
            transition: {
              //   staggerChildren: 0.2,
              type: 'spring',
              damping: 20
            }
          },
          collapsed: {
            opacity: 0,
            height: 0,
            transition: {
              staggerChildren: 0.2,
              type: 'spring',
              damping: 20,
              staggerDirection: -1
            }
          }
        }}
      >
        <RichText html={content} className={classes.accordionItemRichTxt} />
      </motion.div>
    </div>
  );
}
