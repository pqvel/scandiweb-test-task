import React, { PureComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";
import { generateId } from "../../core/helpers/generateId";
import "swiper/css";
import "./productSlider.scss"

class ProductSlider extends PureComponent {
  state = {
    thumbs1: null
  }

  onThumbsSlider = (thumbs1) => {
    this.setState({thumbs1})
  }

  render() {
    const { images } = this.props

    return (
      <div className="product__slider">
        <Swiper
          className="mySwiper1"
          direction="vertical"
          slidesPerView={3}
          spaceBetween={40}
          modules={[FreeMode, Thumbs]}
          onSwiper={this.onThumbsSlider}
          freeMode
          watchSlidesProgress
          grabCursor
        >
          {
            images.map(img => (
              <SwiperSlide key={generateId()}>
                <img className="product__slider-img" src={img} alt="product" />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <Swiper
          className="mySwiper2"
          modules={[Thumbs]}
          spaceBetween={40}
          thumbs={{ swiper: this.state.thumbs1 }}
          watchSlidesProgress
          grabCursor
        >
          {
            images.map(img => (
              <SwiperSlide key={generateId()}>
                <img className="product__slider-img" src={img} alt="product" />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    );
  }
}

export default ProductSlider