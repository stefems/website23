<script>
  import './BigText.scss';
  export let text = '';
  export let vertical = false;
  export let spread = false;
</script>

<div class={`big-text ${vertical ? '-vertical' : ''} ${spread ? '-spread' : ''}`}>
  {text}
</div>
