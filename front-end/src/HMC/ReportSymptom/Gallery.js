import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images-texts-videos';
import DEMO from "../../store/constant";

class Gallery extends React.Component {
    constructor (props) {
        super(props);

        let itemType;

        if (this.props.images) {
            itemType = 'images'
        } else if (this.props.texts) {
            itemType = 'texts'
        } else {
            itemType = 'videos'
        }

        this.state = {
            lightboxIsOpen: false,
            currentItem: 0,
            itemType: itemType,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoItem = this.gotoItem.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    openLightbox (event, index) {
        event.preventDefault();
        this.setState({
            currentItem: index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox () {
        this.setState({
            currentItem: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious () {
        this.setState({
            currentItem: this.state.currentItem - 1,
        });
    }

    gotoNext () {
        this.setState({
            currentItem: this.state.currentItem + 1,
        });
    }

    gotoItem (index) {
        this.setState({
            currentItem: index,
        });
    }

    handleClickItem () {
        if (this.state.currentItem === this.props[this.state.itemType].length - 1) return;

        this.gotoNext();
    }

    renderGallery () {
        if (this.state.itemType === 'images') {
            const { images } = this.props;

            if (!images) return;

            let gallery;

            if (this.props.singleItem) {
                gallery = images.filter(i => i.useForDemo).map((obj, i) => {
                    return (
                        <a
                            href={obj.src}
                            className={css(classes.thumbnail, classes[obj.orientation])}
                            onClick={(e) => this.openLightbox(e, i)}
                            key={i}
                        >
                            <div className='img-thumbnail'>
                                <img src={obj.thumbnail} className={css(classes.source)} alt="" />
                            </div>
                        </a>
                    );
                });
                return (
                    <div className={css(classes.gallery)}>
                        {gallery}
                    </div>
                );
            } else {
                gallery = images.filter(i => i.useForDemo).map((obj, i) => {
                    return (
                        <Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                            <a
                                href={obj.src}
                                className={css(classes.thumbnail, classes[obj.orientation])}
                                onClick={(e) => this.openLightbox(e, i)}
                            >
                                <div className='img-thumbnail'>
                                    <img src={obj.thumbnail} className={css(classes.source)} alt="" />
                                </div>
                            </a>
                        </Col>
                    );
                });
                return (
                    <div className={css(classes.gallery)}>
                        <Row>
                            {gallery}
                        </Row>
                    </div>
                );
            }

        } else if (this.state.itemType === 'texts') {
            const { texts } = this.props;
            let gallery;
            if (!texts) return;

            if (this.props.singleItem) {
                gallery = texts.map((text, i) => {
                    return (
                        <p className={css(classes.text_thumbail)} key={i} onClick={(e) => this.openLightbox(e, i)}>
                            {text}
                        </p>
                    );
                });

                return (
                    <div className={css(classes.gallery)}>
                        {gallery}
                    </div>
                );
            } else {
                gallery = texts.map((text, i) => {
                    return (
                        <Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                            <p
                                className={css(classes.text_thumbail)}
                                onClick={(e) => this.openLightbox(e, i)}
                            >
                                {text}
                            </p>
                        </Col>
                    );
                });

                return (
                    <div className={css(classes.gallery)}>
                        {gallery}
                    </div>
                );
            }
        } else {
            let gallery;
            const { videos } = this.props;

            if (!videos) return;

            if (this.props.singleItem) {
                gallery = videos.map((videoId, i) => {
                    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    return (
                        <a href={DEMO.BLANK_LINK}
                           className={css(classes.video_thumbnail)}
                           key={i}
                           onClick={(e) => this.openLightbox(e, i)}
                        >
                            <div className='img-thumbnail'>
                                <img src={videoThumbnail} className={css(classes.source_video)} alt="" />
                            </div>
                        </a>
                    );
                });

                return (
                    <div className={css(classes.gallery)}>
                        {gallery}
                    </div>
                );
            } else {
                gallery = videos.map((videoId, i) => {
                    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    return (
                        <Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                            <a href={DEMO.BLANK_LINK}
                               className={css(classes.video_thumbnail)}
                               onClick={(e) => this.openLightbox(e, i)}
                            >
                                <div className='img-thumbnail'>
                                    <img src={videoThumbnail} className={css(classes.source_video)} alt="" />
                                </div>
                            </a>
                        </Col>
                    );
                });

                return (
                    <div className={css(classes.gallery)}>
                        <Row>
                            {gallery}
                        </Row>
                    </div>
                );
            }

        }
    }
    render () {
        return (
            <div className='section'>
                {this.props.heading && <h2>{this.props.heading}</h2>}
                {this.props.subheading && <p>{this.props.subheading}</p>}
                {this.renderGallery()}
                <Lightbox
                    currentItem={this.state.currentItem}
                    items={{type:this.state.itemType,items:this.props[this.state.itemType]}}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={() => this.handleClickItem}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={() => this.gotoItem}
                    onClose={this.closeLightbox}
                    showThumbnails={this.props.showThumbnails}
                    theme={this.props.theme}
                    backdropClosesModal={this.props.backdropClosesModal}
                />
            </div>
        );
    }
}

Gallery.displayName = 'Gallery';

const gutter = {
    small: 2,
    large: 4,
};
const classes = StyleSheet.create({
    gallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            marginRight: -gutter.large,
        },
    },

    // anchor
    thumbnail: {
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large,
        },
    },

    // anchor
    video_thumbnail: {
        width:'50%',
        height: '258px',
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large,
        },
    },

    // anchor
    text_thumbail: {
        cursor: 'pointer',
        height: '200px',
        'text-align': 'justify',
        'font-size': '16px',
        width: '46%',
        padding: '10px',
        margin: '10px',
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        overflow: 'scroll',
        border: 'solid 1px #E6E6E8',
        'border-radius': '4px',
        color: 'darkgray',

        '@media (min-width: 500px)': {
        },
    },

    // orientation
    landscape: {
        width: '30%',
    },
    square: {
        paddingBottom: 0,
        width: '40%',

        '@media (min-width: 500px)': {
            paddingBottom: 0,
        },
    },

    // actual <img />
    source: {
        border: 0,
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
        width: 'auto',
    },


    source_video: {
        border: 0,
        height: 'auto',
        maxWidth: '90%',
        width: 'auto',
    },
});

export default Gallery;