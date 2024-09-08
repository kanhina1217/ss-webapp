import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ssapp.kanhina.com"],  # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["*"],  # 許可するHTTPヘッダー
)

# データのバリデーションとシリアライゼーション用のモデル
class Item(BaseModel):
    uuid: str
    currentId: str

# データを保存するリスト（メモリ上に保存）
items = []

# POSTリクエストを受けてデータを保存または更新するエンドポイント
@app.post("/")
async def create_item(item: Item):
    # 同じuuidを持つアイテムが存在するか確認
    for existing_item in items:
        if existing_item.uuid == item.uuid:
            # 存在する場合はcurrentIdを更新
            existing_item.currentId = item.currentId
            # currentIdが"51"または"01"の場合に削除処理をスケジュール
            if item.currentId == "51":
                asyncio.create_task(delete_after_delay(existing_item, 10))  # 10秒後に削除
            elif item.currentId == "01":
                asyncio.create_task(delete_after_delay(existing_item, 60))  # 60秒後に削除
            return {"message": "Data updated", "uuid": item.uuid, "currentId": item.currentId}

    # 存在しない場合は新規追加
    items.append(item)
    # currentIdが"51"または"01"の場合に削除処理をスケジュール
    if item.currentId == "51":
        asyncio.create_task(delete_after_delay(item, 10))  # 10秒後に削除
    elif item.currentId == "01":
        asyncio.create_task(delete_after_delay(item, 60))  # 60秒後に削除
    
    return {"message": "Data created", "uuid": item.uuid, "currentId": item.currentId}

# データを指定時間後に削除する関数
async def delete_after_delay(item: Item, delay: int):
    await asyncio.sleep(delay)  # 指定された秒数（delay）待機
    # itemsリストから削除
    if item in items and item.currentId in ["51", "01"]:  # currentIdが"51"または"01"のままなら削除
        items.remove(item)
        print(f"Item with uuid {item.uuid} and currentId {item.currentId} has been deleted after {delay} seconds.")

# GETリクエストで保存されたデータを返すエンドポイント
@app.get("/items")
async def get_items():
    return items

    # DELETEリクエストでデータを削除するエンドポイント
@app.delete("/items/{uuid}")
async def delete_item(uuid: str):
    global items
    for item in items:
        if item.uuid == uuid:
            items.remove(item)
            return {"message": f"Item with uuid {uuid} has been deleted."}
    return {"message": f"Item with uuid {uuid} not found."}
