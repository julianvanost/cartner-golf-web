import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import roundCardStyles from './style.js'


const RoundCard = props => {
  const classes = roundCardStyles()
  const holes = props.round.course_id.holes

  const getHalfScorecard = (isBack) => {
    let start, finish
    isBack ? start = 9 : start = 0
    isBack ? finish = 17 : finish = 8
    return (
      <>
        <Grid item xs={12} lg={6}>
          <Grid item xs={12}>
            <Typography className={`${classes.center} ${classes.underline}`} variant="subtitle2" gutterBottom>
              {isBack ? 'Back' : 'Front'}
            </Typography>
          </Grid>
          <ListItem>
            <Grid item xs={2} className={` ${classes.center} ${classes.underline}`}>Hole</Grid>
            {displayHoles(start, finish)}
            <Grid item xs={1} className={`${classes.center} ${classes.underline}`}>{isBack ? 'IN' : 'OUT'}</Grid>
          </ListItem>
          <ListItem>
            <Grid item xs={2} className={`${classes.center} ${classes.underline}`}>S.I.</Grid>
            {holes.map((elem, index) => {
              if (index >= start && index <= finish) {
                return (<Grid item xs={1} className={` ${classes.center} ${classes.underline}`}>{elem.handicap}</Grid>)
              }
            })}
          </ListItem>
          {/* Begin mapping user */}
          {props.round.members.map((elem, index) => {
            const offset = finish - elem.score.length + 1
            return (
              <ListItem>
                <Grid item xs={2} className={`${classes.center}`}>{elem.user_id.fname}</Grid>
                {getMemeberScores(isBack, elem.score)}
              </ListItem >
            )
          })}
        </Grid>
      </>
    )

  }
  const displayHoles = (x, y) => {
    let holeArr = []
    for (let i = x; i <= y; i++) {
      holeArr[i] = <Grid item xs={1} className={` ${classes.center} ${classes.underline}`}>{i + 1}</Grid>
    }
    return holeArr
  }
  const getMemeberScores = (isBack, scores) => {
    let start, finish
    isBack ? start = 9 : start = 0
    isBack ? finish = 17 : finish = 8
    let membersScore = []
    for (let i = start; i < scores.length; i++) {
      membersScore.push(
        <Grid item xs={1} className={`${classes.center}`}>
          <TextField className={classes.input} size="small" inputProps={{ style: { textAlign: 'center' } }} value={scores[i].score} />
        </Grid>)
    }
    for (let i = scores.length + start; i < finish + 1; i++) {
      membersScore.push(
        <Grid item xs={1} className={`${classes.center}`}>
          <TextField className={classes.input} size="small" inputProps={{ style: { textAlign: 'center' } }} placeholder={'-'} />
        </Grid>
      )
    }
    return membersScore
  }

  return (
    <>
      <Typography className={`${classes.center} ${classes.underline}`} variant="h6" gutterBottom>
        Scorecard
        </Typography>
      <br />
      <br />
      <Paper className={classes.min}>
        <List>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {getHalfScorecard(false)}
                {/* Put back here */}
                {getHalfScorecard(true)}
              </Grid>
            </Grid>
          </Grid>
        </List>
      </Paper>
    </>
  )
}

export default RoundCard
