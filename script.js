// モーダル（ポップアップ）
'use strict';

const modalBtns = document.querySelectorAll('[data-trigger="btn"]');
const modalItems = document.querySelectorAll('[data-trigger="item"]');
const modalCloseBtns = document.querySelectorAll('[data-modal="close"]');
const regex = /[^0-9]/g;

/* modal close */
modalCloseBtns.forEach(modalCloseBtn => {
  modalCloseBtn.addEventListener('click', function (e) {
    e.currentTarget.closest('[data-modal="box"]').querySelector('[data-modal="bg"]').classList.remove('is-active');
    e.currentTarget.closest('[data-modal="box"]').querySelector('[data-modal="inner"]').classList.remove('is-active');
    const cardModals = e.currentTarget.closest('[data-modal="inner"]').querySelectorAll('[data-trigger="item"]');
    cardModals.forEach(cardModal => {
      cardModal.classList.remove('is-active');
    });
  });
});

/* modal open */
modalBtns.forEach(modalBtn => {
  modalBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const modalBtnNum = e.currentTarget.dataset.modal;

    modalItems.forEach(modalItem => {
      const modalItemNum = modalItem.dataset.modal.replace(regex, "");
      if (modalItemNum == modalBtnNum) {
        document.querySelector('[data-modal="bg"]').classList.add('is-active');
        document.querySelector('[data-modal="inner"]').classList.add('is-active');
        modalItem.classList.add('is-active');
      }
    });
  });
});

function showModal(modalNum) {
  const modalItems = document.querySelectorAll('[data-trigger="item"]');
  const regex = /[^0-9]/g;

  modalItems.forEach(modalItem => {
    const modalItemNum = modalItem.dataset.modal.replace(regex, "");
    if (modalItemNum == modalNum) {
      document.querySelector('[data-modal="bg"]').classList.add('is-active');
      document.querySelector('[data-modal="inner"]').classList.add('is-active');
      modalItem.classList.add('is-active');
    }
  });
}


//部活動フォーム
var select_club = document.getElementById('select_club');
var club_submit_button = document.getElementById('club_submit_button');

club_submit_button.onclick = function () {
  document.getElementById("club").textContent = select_club.value;

  select_club.disabled = true;

  club_submit_button.textContent = "送信済みです";
  club_submit_button.classList.add('disabled_button');
  club_submit_button.disabled = true;
}

//出目入力
document.getElementById("dice_submit_button").addEventListener("click", function () {
  // select_diceの値を取得
  const diceValue = document.getElementById("select_dice").value;

  // 初期値（nullの文字列）が選択されているか確認
  if (diceValue === "null") {
    alert("サイコロの目を選択してください。");
    return; // エラーメッセージを表示して処理を終了
  }

  // 数値に変換
  const diceNumber = parseInt(diceValue);

  // diceNumberがNaNでないか確認
  if (isNaN(diceNumber)) {
    alert("サイコロの目が無効です。");
    return;
  }

  // 現在のcurrentクラスがついている要素を取得
  const currentElement = document.querySelector(".current");

  // 現在のcurrentクラスがついている要素のIDを取得し、その数字部分を取り出す
  const currentIdNumber = parseInt(currentElement.id.replace("div", ""));

  // 新しい位置のIDを計算
  let newIdNumber = currentIdNumber + diceNumber;

  // 新しい位置の番号が51より大きくなるときは51に設定
  if (newIdNumber > 51) {
    newIdNumber = 51;
  }

  // 新しい位置の要素を取得
  const newElement = document.getElementById("div" + String(newIdNumber).padStart(2, '0'));

  // newElementが存在するか確認
  if (!newElement) {
    alert("新しい位置が見つかりません。");
    return; // newElementが存在しない場合は処理を終了
  }

  // 現在のcurrentクラスを削除
  currentElement.classList.remove("current");

  // 新しい位置にcurrentクラスを追加
  newElement.classList.add("current");

  const newIdString = String(newIdNumber).padStart(2, '0');
  sendPostRequest(newIdString);

  updateGameStatus()
});


//debug
//部活動
document.getElementById('club_change_button').onclick = function () {
  var select_club = document.getElementById('select_club');
  var club_submit_button = document.getElementById('club_submit_button');

  // 確認アラートを表示
  var confirmation = confirm("部活動を初期化します。ゲーム進行中の場合動作がうまくいかない場合があります。続行しますか？");

  // ユーザーが「OK」を押した場合のみ、以下の処理を実行
  if (confirmation) {
    // select_clubの無効化を解除
    select_club.disabled = false;

    // セレクトボックスの選択状況を解除（デフォルトの非選択状態に戻す）
    select_club.value = "";

    document.getElementById("club").textContent = "選択してください▶";

    // club_submit_buttonの無効化を解除し、テキストを元に戻す
    club_submit_button.textContent = "送信";
    club_submit_button.classList.remove('disabled_button');
    club_submit_button.disabled = false;
  }
};


//値変更
document.getElementById("apply_btn").addEventListener("click", function () {
  // 確認ダイアログを表示
  if (confirm("値を指定します。ゲーム進行中の場合動作がうまくいかない場合があります。続行しますか？")) {
    // 現在の位置（マス目）設定
    const currentInput = document.getElementById("reset_current").value;
    if (currentInput) { // 値が空でないことを確認
      const divs = document.querySelectorAll("div[id^='div']");
      divs.forEach(div => {
        div.classList.remove("current"); // すべてのdivからcurrentクラスを削除
      });

      const targetDiv = document.getElementById("div" + String(currentInput).padStart(2, '0'));
      if (targetDiv) {
        targetDiv.classList.add("current"); // 入力された番号のdivにcurrentクラスを追加
      }
    }

    // RPポイント設定
    const rpPoints = document.getElementById("reset_pt").value;
    if (rpPoints) { // 値が空でないことを確認
      document.getElementById("pt").textContent = rpPoints;
    }

    // 信頼カード枚数設定
    const trustCards = document.getElementById("reset_trust").value;
    if (trustCards) { // 値が空でないことを確認
      document.getElementById("trust").textContent = trustCards;
    }

    // 部活動設定
    const selectedClub = document.getElementById("reset_select_club").value;
    if (selectedClub) { // 選択された値が空でないことを確認
      document.getElementById("club").textContent = selectedClub;
    }
  }
});

//reset
// ボタンの要素を取得
const clearButton = document.getElementById('clear_all_button');

// ボタンにクリックイベントリスナーを追加
clearButton.addEventListener('click', () => {
  // ページをリロード
  location.reload();
});

// フラグ
let modalShown = false;
let hasAddedPoints = false;
let hasProcessed17 = false; // 特定のマス（17）の処理を1度だけ実行するフラグ
let hasProcessed35 = false; // 特定のマス（35）の処理を1度だけ実行するフラグ
let hasProcessed23 = false;
let hasProcessed33 = false;
let hasProcessed46 = false;
let hasProcessed51 = false;

// 共通処理を関数として定義
function updateGameStatus() {
  // cap_pointの値をまず消す
  document.getElementById('cap_point').innerText = '';
  document.getElementById('cap_usetrust').style.display = 'none';

  // data.jsonからデータを取得
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // select_diceの値を取得（数値型）
      const diceValue = parseInt(document.getElementById('select_dice').value, 10);

      // currentクラスがついている要素を取得
      const currentDiv = document.querySelector('.current');

      // currentクラスがついているマスのid番号を取得
      const currentId = currentDiv ? currentDiv.id.replace('div', '') : null;
      const currentIdInt = parseInt(currentId, 10); // 数値型に変換

      if (currentId) {
        // JSONデータから対応するオブジェクトを取得
        const currentData = data.find(item => item.number === currentId);

        if (currentData) {
          // ptの値を取得
          let pt = parseInt(document.getElementById('pt').innerText, 10);

          // nameをcap_titleに表示
          document.getElementById('cap_title').innerText = currentData.name;

          // infoをcap_textに表示
          document.getElementById('cap_txt').innerText = currentData.info;

          // current-select_diceからcurrentまでの間にあるマスをループしてチェック
          for (let i = diceValue; i <= currentIdInt; i++) {
            let diceNumber = null
            const paddedId = i.toString().padStart(2, '0'); // '01', '02' のようにゼロ埋め
            const divElement = document.getElementById('div' + paddedId);

            if (divElement && divElement.classList.contains('active')) {
              // 対応するJSONデータを取得
              const activeData = data.find(item => item.number === paddedId);

              if (activeData && activeData.type === 'active') {
                // <div id="club"></div>のテキストを取得
                const currentClub = document.getElementById('club').innerText.trim();

                // JSONのclubと照合して一致する場合のみ加算
                if (activeData.club === currentClub) {
                  if (!hasAddedPoints) {
                    if (currentData.type !== 'active') {
                      pt += parseInt(activeData.plus, 10);
                      document.getElementById('cap_point').innerText = activeData.plus + '万';

                      // モーダルに情報をセット
                      document.getElementById('modal_txt').innerText = activeData.info;
                      document.getElementById('modal_title').innerText = activeData.name;
                      document.getElementById('modal_point').innerText = activeData.plus + '万';

                      // モーダル表示
                      showModal("005");

                      // モーダル表示済みフラグをセット
                      hasAddedPoints = true;
                    }
                  }
                }
              }
            }

            // 特定のマスが存在する場合の処理
            if (paddedId === '17' && !hasProcessed17) {
              pt += 15;
              document.getElementById('up_modal_point').innerText = '15万';
              document.getElementById('up_modal_title').innerText = '1年→2年';
              document.getElementById('price').innerText = '1枚10万RP 購入は4枚まで\n購入ボタンと×ボタンはすべて終わった後に押してください。';
              // 非表示にするオプションを一括で取得し、スタイルを変更
              document.querySelectorAll('#buy_trust option[value="5"], #buy_trust option[value="6"], #buy_trust option[value="7"], #buy_trust option[value="8"], #buy_trust option[value="9"]')
                .forEach(option => option.disabled = true);
              showModal("006");
              // フラグをセット
              hasProcessed17 = true;

              document.getElementById('buy_trust_button').addEventListener('click', handleBuyTrustFor17, { once: true });
            }

            if (paddedId === '35' && !hasProcessed35) {
              pt += 25;
              document.getElementById('up_modal_point').innerText = '25万';
              document.getElementById('up_modal_title').innerText = '2年→3年';
              document.getElementById('price').innerText = '1枚20万RP 購入は9枚まで\n購入ボタンと×ボタンはすべて終わった後に押してください。';
              // 表示にするオプションを一括で取得し、スタイルを変更
              document.querySelectorAll('#buy_trust option[value="5"], #buy_trust option[value="6"], #buy_trust option[value="7"], #buy_trust option[value="8"], #buy_trust option[value="9"]')
                .forEach(option => option.disabled = false);
              showModal("006");
              // フラグをセット
              hasProcessed35 = true;

              document.getElementById('buy_trust_button').addEventListener('click', handleBuyTrustFor35, { once: true });
            }

            function clearDiceEventListeners() {
              // 各サイコロボタンのイベントリスナーを削除
              document.getElementById('dice_1').replaceWith(document.getElementById('dice_1').cloneNode(true));
              document.getElementById('dice_2').replaceWith(document.getElementById('dice_2').cloneNode(true));
              document.getElementById('dice_3').replaceWith(document.getElementById('dice_3').cloneNode(true));
              document.getElementById('dice_4').replaceWith(document.getElementById('dice_4').cloneNode(true));
              document.getElementById('dice_5').replaceWith(document.getElementById('dice_5').cloneNode(true));
              document.getElementById('dice_6').replaceWith(document.getElementById('dice_6').cloneNode(true));
            }

            function addDiceEventListeners(handleClickFunction) {
              // クリックイベントリスナーを追加
              document.getElementById('dice_1').addEventListener('click', function () { handleClickFunction(1); });
              document.getElementById('dice_2').addEventListener('click', function () { handleClickFunction(2); });
              document.getElementById('dice_3').addEventListener('click', function () { handleClickFunction(3); });
              document.getElementById('dice_4').addEventListener('click', function () { handleClickFunction(4); });
              document.getElementById('dice_5').addEventListener('click', function () { handleClickFunction(5); });
              document.getElementById('dice_6').addEventListener('click', function () { handleClickFunction(6); });
            }

            if (paddedId === '23' && !hasProcessed23) {
              const newElement = document.getElementById('div24');
              if (newElement) {
                currentDiv.classList.remove("current");
                newElement.classList.add("current");

                document.getElementById('cap_title').innerText = "宮古島";
                document.getElementById('cap_txt').innerText = "･研修旅行ということでみんな私服\n･フィールドワークでは一日中一緒にいる\n･様々な要因が重なってなんだかいい人に見える時もあるみたい\n･突発的な行動はリスクを伴うのでよく考えたい\n･成功するか否かはあなたの技量次第だろう"; // `currentData.info`が必要な場合はここに追加

                document.getElementById('dice_1').style.display = 'inline-block';
                document.getElementById('dice_2').style.display = 'inline-block';
                document.getElementById('dice_3').style.display = 'inline-block';
                document.getElementById('dice_4').style.display = 'inline-block';
                document.getElementById('dice_5').style.display = 'inline-block';
                document.getElementById('dice_6').style.display = 'inline-block';

                clearDiceEventListeners(); // 既存のイベントリスナーをクリア
                addDiceEventListeners(function (diceNumber) {
                  let rp = parseInt(document.getElementById('pt').innerText, 10);
                  let txt = document.getElementById('cap_txt').innerText

                  if (diceNumber === 2 || diceNumber === 4 || diceNumber === 6) {
                    rp += 80;
                    document.getElementById('cap_point').innerText = "80万";
                    document.getElementById('cap_txt').innerText = txt + "\n告白成功！";
                  } else {
                    rp -= 100;
                    document.getElementById('cap_point').innerText = "-100万";
                    document.getElementById('cap_txt').innerText = txt + "\n告白失敗";
                  }

                  document.getElementById('pt').innerText = rp;
                  console.log(`サイコロ${diceNumber}が押されました。現在のrp: ${rp}`);

                  document.getElementById('dice_1').style.display = 'none';
                  document.getElementById('dice_2').style.display = 'none';
                  document.getElementById('dice_3').style.display = 'none';
                  document.getElementById('dice_4').style.display = 'none';
                  document.getElementById('dice_5').style.display = 'none';
                  document.getElementById('dice_6').style.display = 'none';
                });

                hasProcessed23 = true;
                sendPostRequest("24")
                return;
              }
            }

            if (paddedId === '33' && !hasProcessed33) {
              const newElement = document.getElementById('div34');
              if (newElement) {
                currentDiv.classList.remove("current");
                newElement.classList.add("current");

                document.getElementById('cap_title').innerText = "校外学習";
                document.getElementById('cap_txt').innerText = "･たくさんの校外学習を経験した\n･1番印象に残ったのは○○･○○では△△ということをしていて驚いた\n･ほかの校外学習もすごく楽しかった";

                document.getElementById('dice_1').style.display = 'inline-block';
                document.getElementById('dice_2').style.display = 'inline-block';
                document.getElementById('dice_3').style.display = 'inline-block';
                document.getElementById('dice_4').style.display = 'inline-block';
                document.getElementById('dice_5').style.display = 'inline-block';
                document.getElementById('dice_6').style.display = 'inline-block';

                clearDiceEventListeners(); // 既存のイベントリスナーをクリア
                addDiceEventListeners(function (diceNumber) {
                  let rp = parseInt(document.getElementById('pt').innerText, 10);
                  let txt = document.getElementById('cap_txt').innerText

                  if (diceNumber === 1 || diceNumber === 6) {
                    rp += 70;
                    document.getElementById('cap_point').innerText = "70万";
                    document.getElementById('cap_txt').innerText = txt + "\n･午前は留学生と一緒に東京を観光\n･午後はそれぞれが決めた所へフィールドワーク\n･自分の班は〜\n例）たい焼き作った、御朱印集めした、おみくじ引いたなど";
                  } else if (diceNumber === 2) {
                    rp += 50;
                    document.getElementById('cap_point').innerText = "50万";
                    document.getElementById('cap_txt').innerText = txt + "\n･初めての大学の見学\n･大学の広さや施設の充実さに驚いた\n･自分が1番印象に残っているのは〜\n例）牛舎、ソーラーパネル、菌など、、、";
                  } else if (diceNumber === 3) {
                    rp += 50;
                    document.getElementById('cap_point').innerText = "50万";
                    document.getElementById('cap_txt').innerText = txt + "\n･横浜のごみ収集所を管理していたり自転車を保管する機械を作ったりしていた\n･私が印象に残ったのは〜\n例）立体駐車場、ゴミの処理の仕方、ゴミ処理場のモニターなど";
                  } else if (diceNumber === 4) {
                    rp += 50;
                    document.getElementById('cap_point').innerText = "50万";
                    document.getElementById('cap_txt').innerText = txt + "\n･実際に身近で本物の飛行機を見た\n･自分が1番印象に残っているのは〜\n例）安全のための意識、飛行機めっちゃデカい、整備士の話など";
                  } else if (diceNumber === 5) {
                    rp += 50;
                    document.getElementById('cap_point').innerText = "50万";
                    document.getElementById('cap_txt').innerText = txt + "\n･素材の会社AGCとも言われるここでは本当に色々なことを見たり聞けたりした\n例えば〜\n例）フッ素コーティング、3Dプリンター、研究者さんたちとの話など";
                  }

                  document.getElementById('pt').innerText = rp;
                  console.log(`サイコロ${diceNumber}が押されました。現在のrp: ${rp}`);

                  document.getElementById('dice_1').style.display = 'none';
                  document.getElementById('dice_2').style.display = 'none';
                  document.getElementById('dice_3').style.display = 'none';
                  document.getElementById('dice_4').style.display = 'none';
                  document.getElementById('dice_5').style.display = 'none';
                  document.getElementById('dice_6').style.display = 'none';
                });

                hasProcessed33 = true;
                sendPostRequest("34")
                return;
              }
            }

            if (paddedId === '46' && !hasProcessed46) {
              const newElement = document.getElementById('div47');
              if (newElement) {
                currentDiv.classList.remove("current");
                newElement.classList.add("current");

                document.getElementById('cap_title').innerText = "研修旅行";
                document.getElementById('cap_txt').innerText = "･すごく大きなイベントである関西研修旅行\n･広島、岡山、京都、奈良など様々なところを回れる\n･どんな経験になるのかまだ知らない\n･1番楽しみなのは○○";

                document.getElementById('dice_1').style.display = 'inline-block';
                document.getElementById('dice_2').style.display = 'inline-block';
                document.getElementById('dice_3').style.display = 'inline-block';
                document.getElementById('dice_4').style.display = 'inline-block';
                document.getElementById('dice_5').style.display = 'inline-block';
                document.getElementById('dice_6').style.display = 'inline-block';

                clearDiceEventListeners(); // 既存のイベントリスナーをクリア
                addDiceEventListeners(function (diceNumber) {
                  let rp = parseInt(document.getElementById('pt').innerText, 10);
                  let txt = document.getElementById('cap_txt').innerText

                  if (diceNumber === 1) {
                    rp += 100;
                    document.getElementById('cap_point').innerText = "100万";
                    document.getElementById('cap_txt').innerText = txt + "\n･鳥居が何個も並んでる\n･すごい広い\n･本殿が綺麗\n･きっと楽しいのではないでしょうか";
                  } else if (diceNumber === 2) {
                    rp += 100;
                    document.getElementById('cap_point').innerText = "100万";
                    document.getElementById('cap_txt').innerText = txt + "\n･世界遺産\n･国宝でもある\n･恋愛成就の噂がある\n･きっと楽しいのではないでしょうか";
                  } else if (diceNumber === 3) {
                    rp += 80;
                    document.getElementById('cap_point').innerText = "80万";
                    document.getElementById('cap_txt').innerText = txt + "\n･広島にある原子力爆弾の被災地\n･被災後すぐの姿を表している\n･被爆者の方々、被爆者第2世の方々からのお話が聞ける\n･きっと多くのことを学べるのではないでしょうか";
                  } else if (diceNumber === 4) {
                    rp -= 80;
                    document.getElementById('cap_point').innerText = "-80万";
                    document.getElementById('cap_txt').innerText = txt + "\n･抹茶やお茶菓子などとにかく美味しいものが沢山\n･浴衣を着ながら美味しいものを食べてら映えること間違いなし\n･美味しさ×かわいさ、かっこいさを重視\n･きっと楽しいのではないでしょうか";
                  } else if (diceNumber === 5) {
                    rp += 80;
                    document.getElementById('cap_point').innerText = "80万";
                    document.getElementById('cap_txt').innerText = txt + "\n･本当に金色で出来ている\n･水面に移るのが美しい\n･燃やされたことがあるがめっちゃ綺麗\n･きっと楽しいのではないでしょうか";
                  } else if (diceNumber === 6) {
                    rp -= 80;
                    document.getElementById('cap_point').innerText = "-80万";
                    document.getElementById('cap_txt').innerText = txt + "\n･鹿に専用のせんべいをあげられる\n･至近距離で見る鹿が可愛いとは限らない\n･人間が食べるものではないが食べてみたい\n･きっと楽しいのではないでしょうか";
                  }

                  document.getElementById('pt').innerText = rp;
                  console.log(`サイコロ${diceNumber}が押されました。現在のrp: ${rp}`);

                  document.getElementById('dice_1').style.display = 'none';
                  document.getElementById('dice_2').style.display = 'none';
                  document.getElementById('dice_3').style.display = 'none';
                  document.getElementById('dice_4').style.display = 'none';
                  document.getElementById('dice_5').style.display = 'none';
                  document.getElementById('dice_6').style.display = 'none';
                });

                hasProcessed46 = true;
                sendPostRequest("46")
                return;
              }
            }
            if (paddedId === '51' && !hasProcessed51) {
              const newElement = document.getElementById('div51');
              if (newElement) {
                currentDiv.classList.remove("current");
                newElement.classList.add("current");

                document.getElementById('cap_title').innerText = "卒業！";
                document.getElementById('cap_txt').innerText = currentData.info;

                let rp = parseInt(document.getElementById('pt').innerText, 10);
                rp += 300;
                document.getElementById('cap_point').innerText = "300万";

                document.getElementById('pt').innerText = rp;

                document.getElementById('slot').style.display = 'block';

                hasProcessed51 = true;
                return;
              }
            }
          }

          // 更新されたptの値を表示
          document.getElementById('pt').innerText = pt;

          // typeによって処理を分岐
          if (currentData.type === 'plus') {
            const updatedPt = pt + parseInt(currentData.plus, 10);
            document.getElementById('cap_point').innerText = currentData.plus + '万';
            document.getElementById('pt').innerText = updatedPt;
            document.getElementById('cap_O').style.display = 'none';
            document.getElementById('cap_X').style.display = 'none';
          } else if (currentData.type === 'minus') {
            const updatedPt = pt - parseInt(currentData.minus, 10);
            document.getElementById('cap_point').innerText = '-' + currentData.minus + '万';
            document.getElementById('pt').innerText = updatedPt;
            document.getElementById('cap_O').style.display = 'none';
            document.getElementById('cap_X').style.display = 'none';
          } else if (currentData.type === 'change') {
            document.getElementById('cap_O').style.display = 'inline-block';
            document.getElementById('cap_X').style.display = 'inline-block';

            // ボタンが押されたときの処理
            document.getElementById('cap_O').onclick = function () {
              const updatedPt = pt + parseInt(currentData.plus, 10);
              document.getElementById('cap_point').innerText = currentData.plus + '万';
              document.getElementById('pt').innerText = updatedPt;
              document.getElementById('cap_O').style.display = 'none';
              document.getElementById('cap_X').style.display = 'none';
            };
            document.getElementById('cap_X').onclick = function () {
              const updatedPt = pt - parseInt(currentData.minus, 10);
              document.getElementById('cap_point').innerText = '-' + currentData.minus + '万';
              document.getElementById('pt').innerText = updatedPt;
              document.getElementById('cap_O').style.display = 'none';
              document.getElementById('cap_X').style.display = 'none';
            };
          } else if (currentData.type === 'active') {
            // <div id="club"></div>のテキストを取得
            const currentClub = document.getElementById('club').innerText.trim();

            // JSONのclubと照合して一致する場合のみ加算
            if (currentData.club === currentClub) {
              if (!hasAddedPoints) {
                const updatedPt = pt + parseInt(currentData.plus, 10);
                document.getElementById('cap_point').innerText = currentData.plus + '万';
                document.getElementById('pt').innerText = updatedPt;

                hasAddedPoints = true;
              }
            }
          } else if (currentData.type === '20') {
            function clearDiceEventListeners() {
              // 各サイコロボタンのイベントリスナーを削除
              document.getElementById('dice_1').replaceWith(document.getElementById('dice_1').cloneNode(true));
              document.getElementById('dice_2').replaceWith(document.getElementById('dice_2').cloneNode(true));
              document.getElementById('dice_3').replaceWith(document.getElementById('dice_3').cloneNode(true));
              document.getElementById('dice_4').replaceWith(document.getElementById('dice_4').cloneNode(true));
              document.getElementById('dice_5').replaceWith(document.getElementById('dice_5').cloneNode(true));
              document.getElementById('dice_6').replaceWith(document.getElementById('dice_6').cloneNode(true));
            }

            function addDiceEventListeners(handleClickFunction) {
              // クリックイベントリスナーを追加
              document.getElementById('dice_1').addEventListener('click', function () { handleClickFunction(1); });
              document.getElementById('dice_2').addEventListener('click', function () { handleClickFunction(2); });
              document.getElementById('dice_3').addEventListener('click', function () { handleClickFunction(3); });
              document.getElementById('dice_4').addEventListener('click', function () { handleClickFunction(4); });
              document.getElementById('dice_5').addEventListener('click', function () { handleClickFunction(5); });
              document.getElementById('dice_6').addEventListener('click', function () { handleClickFunction(6); });
            }
            
            document.getElementById('dice_1').style.display = 'inline-block';
            document.getElementById('dice_2').style.display = 'inline-block';
            document.getElementById('dice_3').style.display = 'inline-block';
            document.getElementById('dice_4').style.display = 'inline-block';
            document.getElementById('dice_5').style.display = 'inline-block';
            document.getElementById('dice_6').style.display = 'inline-block';

            clearDiceEventListeners(); // 既存のイベントリスナーをクリア
            addDiceEventListeners(function (diceNumber) {
              let rp = parseInt(document.getElementById('pt').innerText, 10);
              let txt = document.getElementById('cap_txt').innerText

              if (diceNumber === 1) {
                rp += 50;
                document.getElementById('cap_point').innerText = "50万";
                document.getElementById('cap_txt').innerText = txt + "\nサーターアンダギーを食べた";
              } else if (diceNumber === 2) {
                rp += 70;
                document.getElementById('cap_point').innerText = "70万";
                document.getElementById('cap_txt').innerText = txt + "\n海に行って魚を食べた";
              } else if (diceNumber === 3) {
                rp += 20;
                document.getElementById('cap_point').innerText = "20万";
                document.getElementById('cap_txt').innerText = txt + "\nお皿を洗った";
              } else if (diceNumber === 4) {
                rp += 10;
                document.getElementById('cap_point').innerText = "10万";
                document.getElementById('cap_txt').innerText = txt + "\n子供とお遊び";
              } else if (diceNumber === 5) {
                rp += 40;
                document.getElementById('cap_point').innerText = "40万";
                document.getElementById('cap_txt').innerText = txt + "\nヤシガニを見に行った";
              } else if (diceNumber === 6) {
                rp += 80;
                document.getElementById('cap_point').innerText = "80万";
                document.getElementById('cap_txt').innerText = txt + "\nカツカレーを食べた";
              }

              document.getElementById('pt').innerText = rp;
              console.log(`サイコロ${diceNumber}が押されました。現在のrp: ${rp}`);

              document.getElementById('dice_1').style.display = 'none';
              document.getElementById('dice_2').style.display = 'none';
              document.getElementById('dice_3').style.display = 'none';
              document.getElementById('dice_4').style.display = 'none';
              document.getElementById('dice_5').style.display = 'none';
              document.getElementById('dice_6').style.display = 'none';
            });
          }

          // trustに値がある場合はcap_usetrustを表示、ない場合は非表示
          if (currentData.trust) {
            const trustButton = document.getElementById('cap_usetrust');
            trustButton.style.display = 'inline-block';

            // ボタンが押されたときの処理
            trustButton.onclick = function () {
              let currentTrust = parseInt(document.getElementById('trust').innerText, 10);

              if (currentTrust >= currentData.trust) {
                // trustをcurrentData.trust分減らす
                document.getElementById('trust').innerText = currentTrust - currentData.trust;

                // ptをcurrentData.minus分増やす
                let currentPt = parseInt(document.getElementById('pt').innerText, 10);
                document.getElementById('pt').innerText = currentPt + parseInt(currentData.minus, 10);

                // cap_pointを0にする
                document.getElementById('cap_point').innerText = '0';

                // ボタンを非表示にする
                trustButton.style.display = 'none';
              } else {
                alert('信頼カードが不足しています。');
              }
            };
          } else {
            document.getElementById('cap_usetrust').style.display = 'none';
          }
        }
      }
    })
    .catch(error => console.error('Error:', error));
  
}

// 特定のマス（17）に対する購入処理
function handleBuyTrustFor17() {
  let pt = parseInt(document.getElementById('pt').innerText, 10);
  const trustValue = parseInt(document.getElementById('buy_trust').value, 10);
  const cost = trustValue * 10; // 1個あたり10ポイント
  let currentPt = parseInt(document.getElementById('pt').innerText, 10);

  // if (cost > currentPt) {
  //   alert(`ポイントが不足しています。現在のポイント: ${currentPt}, 必要なポイント: ${cost}`);
  // }

  const confirmPurchase = confirm(`購入: ${trustValue}個, 合計ポイント: ${cost}です。購入しますか？`);

  if (confirmPurchase) {
    // 現在のポイントとトラストの値を取得
    let currentTrust = parseInt(document.getElementById('trust').innerText, 10);
    let currentPt = parseInt(document.getElementById('pt').innerText, 10);

    // トラストとポイントの値を更新
    document.getElementById('trust').innerText = currentTrust + trustValue;
    document.getElementById('pt').innerText = currentPt - cost;

    console.log(`購入: ${trustValue}個, 合計ポイント: ${cost}`);
  }
}

// 特定のマス（35）に対する購入処理
function handleBuyTrustFor35() {
  let pt = parseInt(document.getElementById('pt').innerText, 10);
  const trustValue = parseInt(document.getElementById('buy_trust').value, 10);
  const cost = trustValue * 20; // 1個あたり20ポイント
  let currentPt = parseInt(document.getElementById('pt').innerText, 10);

  // if (cost > currentPt) {
  //   alert(`ポイントが不足しています。現在のポイント: ${currentPt}, 必要なポイント: ${cost}`);
  // }

  const confirmPurchase = confirm(`購入: ${trustValue}個, 合計ポイント: ${cost}です。購入しますか？`);

  if (confirmPurchase) {
    // 現在のポイントとトラストの値を取得
    let currentTrust = parseInt(document.getElementById('trust').innerText, 10);
    let currentPt = parseInt(document.getElementById('pt').innerText, 10);

    // トラストとポイントの値を更新
    document.getElementById('trust').innerText = currentTrust + trustValue;
    document.getElementById('pt').innerText = currentPt - cost;

    console.log(`購入: ${trustValue}個, 合計ポイント: ${cost}`);
  }
}

// apply_btnがクリックされたときのイベント
document.getElementById('apply_btn').addEventListener('click', updateGameStatus);

// ページが読み込まれたときにも同じ処理を実行
window.onload = updateGameStatus;

function dev() {
  const option = document.querySelector('#select_dice option[value="0"]');
  if (option) {
    option.removeAttribute('hidden');
  }
  console.log("StartDevMode")
  setInterval(() => {
    let rp = parseInt(document.getElementById('pt').innerText, 10);
    console.log("現在のRP:" + rp);
  }, 10);
}

document.getElementById("slot_apply_btn").addEventListener("click", function() {
  // 賭け金と倍率を取得
  let pt = parseInt(document.getElementById('pt').innerText, 10);
  const slotPt = parseFloat(document.getElementById("slot_pt").value);
  const slotTimes = parseFloat(document.getElementById("slot_times").value);

  // 賭け金が現在のポイントより多ければ処理を中止
  if (slotPt > pt) {
      alert("賭け金が現在のポイントを超えています。");
      return;
  }

  // 現在のポイントから賭け金を引く
  pt -= slotPt;

  // 賭け金 × 合計の倍率を現在のポイントに足す
  pt += slotPt * slotTimes;

  // 更新されたポイントを表示
  document.getElementById('pt').innerText = pt;
});


// クライアント側でUUIDを生成する関数
function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

let uuid = generateUUID();

function sendPostRequest(currentId) {
  $.ajax({
      url: "https://ssapi.kanhina.com",  // 送信先のURL
      type: "POST",                      // POSTメソッドを使用
      contentType: "application/json",   // JSON形式で送信
      data: JSON.stringify({
          uuid: uuid,                    // 引数で受け取ったuuidを送信
          currentId: currentId            // 引数で受け取ったcurrentIdを送信
      }),
      success: function(response) {
          console.log("Success:", response);  // 成功時の処理
      },
      error: function(xhr, status, error) {
          console.error("Error:", error);  // エラー時の処理
      }
  });
}


// ページ読み込み時にlocalStorageからdeviceIdを取得してinputに設定
window.onload = function() {
  // localStorageからuuidを削除
  localStorage.removeItem('deviceId');

  updateGameStatus()

  sendPostRequest("01")
};

