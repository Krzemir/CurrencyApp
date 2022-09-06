import ResultBox from './ResultBox';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
      });

    it('should render proper info about conversion when PLN->USD', () => {

        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '234', from: 'PLN', to: 'USD' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '66576', from: 'PLN', to: 'USD' },
      ];

      for(const testObj of testCases) {
        
        // render component
        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);

         // find result box div
        const resultBox = screen.getByTestId('resultBox');
        //find value in USD
        const convertedValue = convertPLNToUSD(parseInt(testObj.amount),)

        //changeinput to number
        const inputNumberFormat = formatAmountInCurrency(parseInt(testObj.amount), testObj.from)

        //check if result box div content is old value=new value in currency format
        expect(resultBox).toHaveTextContent(`${inputNumberFormat } = ${convertedValue}`);
        
           // unmount component
        cleanup()
      }
    })

    it('should render proper info about conversion when USD->PLN', () => {

        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '234', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'USD', to: 'PLN' },
            { amount: '66576', from: 'USD', to: 'PLN' },
      ];

      for(const testObj of testCases) {
        
        // render component
        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);

         // find result box div
        const resultBox = screen.getByTestId('resultBox');

        //find value in USD
        const convertedValue = convertUSDToPLN(parseInt(testObj.amount),)
        
        //changeinput to currency
        const inputNumberFormat = formatAmountInCurrency(parseInt(testObj.amount), testObj.from)

        //check if result box div content is old value=new value in currency format
        expect(resultBox).toHaveTextContent(`${inputNumberFormat } = ${convertedValue}`);
        
           // unmount component
        cleanup()
      }
    })

    it('should make results equal if input from and to is the same', () => {

        const testCases = [
            { amount: '100', from: 'USD', to: 'USD' },
            { amount: '234', from: 'PLN', to: 'PLN' },
        ];
      
        for(const testObj of testCases) {
        // render component
        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);

        // find result box div
        const resultBox = screen.getByTestId('resultBox');

        const inputNumberFormatFrom = formatAmountInCurrency(parseInt(testObj.amount), testObj.from)
        const inputNumberFormatTo = formatAmountInCurrency(parseInt(testObj.amount), testObj.to)
        
        //check if result box div content is old value=new value in currency format
        expect(resultBox).toHaveTextContent(`${inputNumberFormatFrom } = ${inputNumberFormatTo}`);
              // unmount component
        cleanup()
      }
      });

      it('should return "Error" when input is lower than zero', () => {

        const testCases = [
            { amount: '-100', from: 'USD', to: 'PLN' },
            { amount: '-234', from: 'USD', to: 'PLN' },
            { amount: '-200', from: 'USD', to: 'PLN' },
            { amount: '-66576', from: 'USD', to: 'PLN' },
      ];
        for (const testObj of testCases){
        // render component
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);

             //find result box div

             const resultBox = screen.getByTestId('resultBox');
            
            // //put "Wrong valulte" int the coponent

             expect(resultBox).toHaveTextContent('Wrong value');
              // unmount component
        cleanup()
        }
   
      });
    

});