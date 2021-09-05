import React from 'react'
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'
import {NavLink} from 'react-router-dom'

import imageFooter from '../../images/footer.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagramSquare as instagram} from '@fortawesome/free-brands-svg-icons'
import {faFacebookSquare as facebook} from '@fortawesome/free-brands-svg-icons'
import {faVk as vk} from '@fortawesome/free-brands-svg-icons'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'relative',
    },
    footerImageStyle: {
        background: `url(${imageFooter}) no-repeat center 50px;`,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '526px',
        zIndex: -1,
    },
    contentContainer: {
        zIndex: 1,
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    line: {
        borderTop: '1px solid #a7a7a7',
        maxWidth: '970px',
        margin: '20px 0'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '970px',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '60px',
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '15px',
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 240,
        paddingBottom: 30
    },
    gridContainer: {
    },
    map: {
        maxWidth: '240px',
    },
    lineTitle: {
        borderTop: '1px dashed #109fcb',
        width: '60px',
        margin: '5px 0 20px 0',
    },
    h6: {
        margin: 0,
        fontSize: 16,
    },
    phoneNumberContainer: {
        display: 'flex',
        '& a': {
            textDecoration: 'none',
            color: '#039be6',
        },
        '& .icon': {
            fontSize: '16px',
            width: '10px',
            color: '#039be6',
        },
    },
    phoneNumber: {
        transition: 'all .3s ease',
        '&:hover': {
            transform: 'scaleX(.96)',
        },
    },
    addressContainer: {

    },
    address: {

        '& div a': {
            textDecoration: 'none',
            color: '#039be6',
        },
        textAlign: 'center',
        display: 'flex',
    },
    aStyle: {
        transition: 'all .3s ease',
        '&:hover': {
            transform: 'scaleX(.96)',
        },
        width: 'auto',
    },
    addressTitle: {
      textAlign: 'center',
    },
    mail: {
        fontFamily: 'sans-serif',
        '& a': {
            textDecoration: 'none',
            color: '#039be6',
        },
        display: 'flex',
    },
    mailIcon: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: '10px',
    },
    text: {
        textAlign: 'center',
    },
    lineSmall: {
     borderTop: '2px dashed #a7a7a7',
        maxWidth: '180px',
        width: '180px',
        margin: '10px 0',
    },
    icon: {
        color: 'rgba(244, 215, 189) 20%',
    },
    phoneItem: {
        display: 'flex',
        fontFamily: 'sans-serif',
    },
    phoneIcon: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: '10px',
    },
    mapIcon: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: '20px',
        marginRight: '10px',
    },
    textRules: {
        display: 'flex',
        flexDirection: 'column',
        '& a': {
            marginBottom: '10px',
            transition: 'all .3s ease',
            textDecoration: 'none',
            color: '#039be6',
        },
        '& a:hover': {
            transform: 'scaleX(.96)',
        },
    },
    aSocietyIcons: {
        transition: 'all .3s ease',
        '&:hover': {
            transform: 'scale(.96)',
            borderColor: '#039be6',
            borderStyle: 'solid',
        },
        border: '1px dashed #a7a7a7',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2f2f2f',
        backgroundColor: '#fcf7f1',
        margin: '0 0 10px 10px',
        '& *': {
            width: '30px !important',
            height: '30px !important',
        },

    },
    aSocietyIconsContainer: {
        display: 'flex',

    },


})

class Footer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    render () {
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <div className={classes.container}>
                        <div className={classes.lineContainer}>
                            <div className={classes.line}/>
                        </div>
                        <Grid
                            container
                            className={classes.gridContainer}
                        >
                            <Grid
                                item
                                lg={3}
                                md={4}
                                sm={12}
                                xs={12}
                                className={classes.gridItem}
                            >
                                <h6 className={classes.h6}>КАРТА</h6>
                                <div className={classes.lineTitle}/>
                                <div className={classes.map}>
                                    <iframe
                                        title={'uniqueTitleProperty'}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86873.43739965447!2d37.51192305876892!3d47.12269046069376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e6e6a7bee7582b%3A0xa5d118300a75b5ce!2z0JzQsNGA0LjRg9C_0L7Qu9GMLCDQlNC-0L3QtdGG0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA4NzUwMA!5e0!3m2!1sru!2sua!4v1626278115531!5m2!1sru!2sua"
                                        width="240px"
                                        height="240px"
                                        loading="lazy"
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={4}
                                sm={12}
                                xs={12}
                                className={classes.gridItem}
                            >
                                <h6 className={classes.h6}>КОНТАКТЫ</h6>
                                <div className={classes.lineTitle}/>
                                <div className={classes.phoneNumberContainer}>
                                    <div>
                                        <div className={classes.phoneItem}>
                                            <div className={classes.phoneIcon}>
                                                <FontAwesomeIcon icon="phone"/>
                                            </div>
                                            <div className={classes.phoneNumber}>
                                                <a href="tel:0975127077">+380 (97) 512-70-77</a>
                                            </div>
                                        </div>
                                        <div className={classes.phoneItem}>
                                            <div className={classes.phoneIcon}>
                                                <FontAwesomeIcon icon="phone"/>
                                            </div>
                                            <div className={classes.phoneNumber}>
                                                <a href="tel:0975127077">+380 (97) 512-70-77</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.lineSmall}/>
                                <div className={classes.addressContainer}>
                                    <div className={classes.addressTitle}>Адрес офиса 'Тортодельня':</div>
                                    <div className={classes.address}>
                                        <div className={classes.mapIcon}>
                                            <FontAwesomeIcon icon="map-marker-alt"/>
                                        </div>
                                        <div className={classes.aStyle}>
                                            <a target="_blank"
                                               rel="noopener noreferrer"
                                               href="https://goo.gl/maps/fGSMj3SzUQkBFWVy7">
                                                <div>г. Мариуполь,</div>
                                                <div>пр. Металлургов, 101</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.lineSmall}/>
                                Электронная почта:
                                <div className={classes.mail}>
                                    <div className={classes.mailIcon}>
                                        <FontAwesomeIcon icon="envelope"/>
                                    </div>
                                    <div className={classes.aStyle}>
                                        <a href="mailto:tortodel.store@gmail.com">
                                            tortodel.store@gmail.com
                                        </a>
                                    </div>
                                </div>
                                < div className={classes.lineSmall}/>
                                <div className={classes.text}>
                                    <div>Время работы</div>
                                    <div>Ежедневно с <b>10.00</b>-<b>20.00</b></div>
                                    <div>Без выходных</div>
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={4}
                                sm={12}
                                xs={12}
                                className={classes.gridItem}
                            >
                                <h6 className={classes.h6}>СОЦСЕТИ</h6>
                                <div className={classes.lineTitle}/>
                                <div className={classes.aSocietyIconsContainer}>
                                    <a rel="noopener noreferrer" target="_blank" className={classes.aSocietyIcons} href="https://www.instagram.com/spacex/?hl=ru"><FontAwesomeIcon icon={instagram}/></a>
                                    <a rel="noopener noreferrer" target="_blank" className={classes.aSocietyIcons} href="https://www.facebook.com/spacenewsx/"><FontAwesomeIcon icon={facebook}/></a>
                                    <a rel="noopener noreferrer" target="_blank" className={classes.aSocietyIcons} href="https://vk.com/elonmusk"><FontAwesomeIcon icon={vk}/></a>
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={4}
                                sm={12}
                                xs={12}
                                className={classes.gridItem}
                            >
                                <h6 className={classes.h6}>ПРАВИЛА</h6>
                                <div className={classes.lineTitle}/>
                                <div className={classes.textRules}>
                                    <NavLink
                                        rel='noreferrer'
                                        to={'/confidentiality'}
                                    >
                                        Конфиденциальность
                                    </NavLink>
                                    <NavLink
                                        to={'/order'}
                                    >
                                        Как заказать?
                                    </NavLink>
                                    <NavLink
                                        to={'/return'}
                                    >
                                        Возврат
                                    </NavLink>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                </div>
                <div className={classes.footerImageStyle}/>
            </div>

        );
    }
}

export default withStyles(styles)(Footer)