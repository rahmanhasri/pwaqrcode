<script lang="ts">
  import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';
  import { onMount } from 'svelte';

  let scanning = false;

  let html5Qrcode: Html5Qrcode;

  onMount(init);

  function init() {
    html5Qrcode = new Html5Qrcode('reader');
  }

  function start() {
    html5Qrcode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      onScanSuccess,
      onScanFailure
    );
    scanning = true;
  }

  async function stop() {
    await html5Qrcode.stop();
    scanning = false;
  }

  function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
    // alert(`Code matched = ${decodedText}`);
		if (!decodedText.match(import.meta.env.QR_PATTERN)) {
			alert("invalid qr")
			return
		}
    console.log(decodedResult);
  }

  function onScanFailure(error: string) {
    console.warn(`Code scan error = ${error}`);
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte app" />
</svelte:head>

<main>
  <reader id="reader" />
  {#if scanning}
    <button on:click={stop} type="button" class="btn variant-filled-error">Stop</button>
  {:else}
    <button on:click={start} type="button" class="btn variant-filled">Start</button>
  {/if}
</main>

<style>
  /* section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	} */
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  reader {
    width: 100%;
    min-height: 500px;
    background-color: black;
  }
</style>
