function SkeletonWelcome() {
  return (
    <div className='welcome_container'>
      <div className='text' />
      <div className='text_2' />
      <div className='btn_contact' />
      <div className='canvas_load' />
    </div>
  )
}

function SkeletonScroll() {
  return (
    <div className='scroll_container'>
      <div className='text' />
      <div className='scroll_in'>
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
      </div>
      <div className='scroll_in'>
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
        <div className='logo_load' />
      </div>
    </div>
  )
}

function SkeletonWorks() {
  return (
    <div className='video_container'>
      <div className='video' />
      <div className='video' />
      <div className='video' />
    </div>
  )
}

function SkeletonFeedback() {
  return (
    <div className='form_container'>
      <div className='text' />
      <div className='form'>
        <div className='input_wrap'>
          <div className='label' />
          <div className='input' />
        </div>
        <div className='input_wrap'>
          <div className='label' />
          <div className='input' />
        </div>
        <div className='input_wrap'>
          <div className='label' />
          <div className='input' />
        </div>
        <span className='linesplit'></span>
        <div className='btn' />
      </div>
    </div>
  )
}

export { SkeletonWelcome, SkeletonScroll, SkeletonFeedback, SkeletonWorks }
