import Main from "../pages/index"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

describe("La Coco Crypto Exchange", () => {
    it("renders an exchange platform", () => {
        render(<Main />)
        // Check if all components are rendered
        expect(screen.getByTestId("convert-title")).toBeInTheDocument()
        expect(screen.getByTestId("amount")).toBeInTheDocument()
        expect(screen.getByTestId("from-currency")).toBeInTheDocument()
        expect(screen.getByTestId("to-currency")).toBeInTheDocument()
        expect(screen.getByTestId("switch-icon")).toBeInTheDocument()
        expect(screen.getByTestId("result")).toBeInTheDocument()
        expect(screen.getByTestId("error")).toBeInTheDocument()
    })

    it("checks for invalid amount", () => {
        render(<Main />)
        const amountInput = screen.getByTestId("amount")
        const errorMsg = screen.getByTestId("error")
        fireEvent.change(amountInput, { target: { value: '0' } })
        expect(errorMsg).toHaveTextContent("Amount should be a number and greater than 0.");
    })
})

