const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY!
const CHAPA_API_URL = "https://api.chapa.co/v1"

export async function initializePayment({
  amount,
  email,
  firstName,
  lastName,
  tx_ref,
}: {
  amount: number
  email: string
  firstName: string
  lastName: string
  tx_ref: string
}) {
  try {
    const response = await fetch(`${CHAPA_API_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency: "ETB",
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/verify`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      }),
    })

    if (!response.ok) throw new Error("Payment initialization failed")

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Payment error:", error)
    throw error
  }
}

export async function verifyPayment(tx_ref: string) {
  try {
    const response = await fetch(`${CHAPA_API_URL}/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    })

    if (!response.ok) throw new Error("Payment verification failed")

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Verification error:", error)
    throw error
  }
}

